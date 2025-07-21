import { render, screen, fireEvent, act } from "@testing-library/react";
import { StoryViewer } from "./StoryViewer";
import "@testing-library/jest-dom";

jest.useFakeTimers();

const mockProps = {
  storyData: {
    id: "u1",
    name: "Test User",
    avatar: "https://example.com/avatar.jpg",
    stories: [
      { id: "s1", url: "https://example.com/story1.jpg" },
      { id: "s2", url: "https://example.com/story2.jpg" },
    ],
  },
  onClose: jest.fn(),
  onPrevUser: jest.fn(),
  onNextUser: jest.fn(),
  markAsWatched: jest.fn(),
};

describe("StoryViewer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders user name and avatar", () => {
    render(<StoryViewer {...mockProps} />);
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByAltText("Test User")).toHaveAttribute(
      "src",
      mockProps.storyData.avatar
    );
  });

  it("renders first story image", () => {
    render(<StoryViewer {...mockProps} />);
    const img = screen.getByTestId("story-image");
    expect(img).toHaveAttribute("src", mockProps.storyData.stories[0].url);
  });

  it("calls markAsWatched after last story viewed", () => {
    render(<StoryViewer {...mockProps} />);
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(mockProps.markAsWatched).toHaveBeenCalledWith("u1");
  });

  it("goes to next story on right click", () => {
    render(<StoryViewer {...mockProps} />);

    act(() => {
      fireEvent.click(document.body, { clientX: window.innerWidth }); 
      jest.runOnlyPendingTimers(); 
    });

    const img = screen.getByTestId("story-image");
    expect(img).toHaveAttribute("src", mockProps.storyData.stories[1].url);
  });

  it("goes to previous story or user on left click", () => {
    render(<StoryViewer {...mockProps} />);

    act(() => {
      fireEvent.click(document.body, { clientX: window.innerWidth }); 
      jest.runOnlyPendingTimers(); 
    });

    const img = screen.getByTestId("story-image");
    expect(img).toHaveAttribute("src", mockProps.storyData.stories[1].url);

    act(() => {
      fireEvent.click(document.body, { clientX: 0 }); 
      jest.runOnlyPendingTimers(); 
    });

    expect(img).toHaveAttribute("src", mockProps.storyData.stories[0].url);

  });

  it("calls onNextUser when on last story and right clicked", () => {
    render(<StoryViewer {...mockProps} />);
    act(() => {
      fireEvent.click(document.body, { clientX: window.innerWidth }); 
      jest.runOnlyPendingTimers(); 
    });
    act(() => {
      fireEvent.click(document.body, { clientX: window.innerWidth }); 
      jest.runOnlyPendingTimers(); 
    });
    expect(mockProps.onNextUser).toHaveBeenCalled();
  });

  it("calls onClose when close button clicked", () => {
    render(<StoryViewer {...mockProps} />);
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it("displays error message if image fails to load", () => {
    render(<StoryViewer {...mockProps} />);
    const img = screen.getByTestId("story-image");
    fireEvent.error(img);
    expect(screen.getByText(/Failed to load story/i)).toBeInTheDocument();
  });
});
