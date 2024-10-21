import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";

import Sidebar from "@/features/sidebar/components/Sidebar";
import { sidebarStore } from "@/features/sidebar/store";
import * as actions from "@/features/sidebar/actions";

/*
We mock the Config as it is required by the persistState() method in the
core/feature.ts when the setSidebarPanelId() is called
*/
/*
We mock the Config as it is required by the persistState() method in the
core/feature.ts when the setSidebarPanelId() is called
*/
vi.mock("@/config", () => {
  return {
    Config: {
      instance: {
        name: "xyz",
      },
    },
  };
});
vi.mock("@/connected/InfoPanel", () => {
  return {
    default: () => <div>Info Panel</div>,
  };
});
vi.mock("@/connected/TimeSeriesPanel", () => {
  return {
    default: () => <div>Time-Series Panel</div>,
  };
});
vi.mock("@/connected/StatisticsPanel", () => {
  return {
    default: () => <div>Statistics Panel</div>,
  };
});
vi.mock("@/connected/VolumePanel", () => {
  return {
    default: () => <div>Volume Panel</div>,
  };
});

const setSidebarPanelIdSpy = vi.spyOn(actions, "setSidebarPanelId");

describe("Sidebar Component", () => {
  beforeEach(() => {
    setSidebarPanelIdSpy.mockClear();
    sidebarStore.setState({ sidebarPanelId: "info" });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("displays the correct initial panel", () => {
    render(<Sidebar />);
    expect(screen.getByText("Info Panel")).toBeInTheDocument();
  });

  it("changes the panel when a tab is clicked", () => {
    render(<Sidebar />);

    fireEvent.click(screen.getByText("Statistics"));

    expect(screen.getByText("Statistics Panel")).toBeInTheDocument();
  });

  it("displays all tabs", () => {
    render(<Sidebar />);

    const tabNames = ["Info", "Statistics", "Time-Series", "Volume"];
    tabNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it("calls setSidebarPanelId with the correct value 'info'", () => {
    render(<Sidebar />);
    // screen.debug();

    fireEvent.click(screen.getByText("Statistics"));
    fireEvent.click(screen.getByText("Info"));

    expect(setSidebarPanelIdSpy).toHaveBeenCalledWith("info");
    expect(setSidebarPanelIdSpy).toHaveBeenCalledTimes(2);
  });

  it("calls setSidebarPanelId with the correct value 'stats'", () => {
    render(<Sidebar />);
    // screen.debug();

    fireEvent.click(screen.getByText("Statistics"));

    expect(setSidebarPanelIdSpy).toHaveBeenCalledWith("stats");
    expect(setSidebarPanelIdSpy).toHaveBeenCalledTimes(1);
  });

  it("calls setSidebarPanelId with the correct value 'timeSeries'", () => {
    render(<Sidebar />);
    // screen.debug();

    fireEvent.click(screen.getByText("Time-Series"));

    expect(setSidebarPanelIdSpy).toHaveBeenCalledWith("timeSeries");
    expect(setSidebarPanelIdSpy).toHaveBeenCalledTimes(1);
  });

  it("calls setSidebarPanelId with the correct value 'volume'", () => {
    render(<Sidebar />);
    // screen.debug();

    fireEvent.click(screen.getByText("Volume"));

    expect(setSidebarPanelIdSpy).toHaveBeenCalledWith("volume");
    expect(setSidebarPanelIdSpy).toHaveBeenCalledTimes(1);
  });

  it("calls setSidebarPanelId with the correct number of times", () => {
    render(<Sidebar />);
    // screen.debug();

    fireEvent.click(screen.getByText("Statistics"));
    fireEvent.click(screen.getByText("Statistics"));

    expect(setSidebarPanelIdSpy).toHaveBeenCalledWith("stats");
    expect(setSidebarPanelIdSpy).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText("Volume"));
    fireEvent.click(screen.getByText("Statistics"));

    expect(setSidebarPanelIdSpy).toHaveBeenCalledWith("stats");
    expect(setSidebarPanelIdSpy).toHaveBeenCalledTimes(3);
  });

  it("doesn't call setSidebarPanelId when it is already 'info'", () => {
    render(<Sidebar />);

    fireEvent.click(screen.getByText("Info"));
    fireEvent.click(screen.getByText("Info"));
    fireEvent.click(screen.getByText("Info"));

    expect(setSidebarPanelIdSpy).toHaveBeenCalledTimes(0);
  });
});
