import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";

let data = {
  day : "Monday",
  appointments: {1:{id: 1, time: "12pm", interview: null}},
  days: [{id: 1, name: "Monday", appointments: Array(5), interviewers: Array(5), spots: 2}],
  interviewers: {1: {id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png"}}

}

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment  data/>);
  });
});