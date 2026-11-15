import { describe, expect, it } from "vitest";
import { events } from "../data/events";
import { filterEvents } from "./filter-events";

describe("filterEvents", () => {
  it("matches search terms across event names and venues without case sensitivity", () => {
    expect(filterEvents(events, { query: "SKYLARK" }).map((event) => event.slug)).toEqual([
      "rooftop-sessions-golden-hour",
    ]);
  });

  it("combines category and search filters", () => {
    expect(
      filterEvents(events, { category: "Arts & culture", query: "film" }).map(
        (event) => event.slug,
      ),
    ).toEqual(["indie-film-and-a-conversation"]);
  });

  it("returns all events for an empty search and the all-events category", () => {
    expect(filterEvents(events, { category: "All events", query: " " })).toEqual(events);
  });
});
