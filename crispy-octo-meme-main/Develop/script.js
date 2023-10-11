// This ensures that the JavaScript code will run after the HTML has been completely loaded
$(document).ready(function () {

  // Display the current day using the Day.js library
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  // Iterate over time blocks from 9 AM to 5 PM
  for (let hour = 9; hour <= 17; hour++) {
    const timeBlock = $(`#hour-${hour}`); // Select the time block with the corresponding hour

    // Get the current hour using the Day.js library
    const currentHour = dayjs().hour();

    // Apply styles based on whether the time block is in the past, present, or future
    if (hour < currentHour) {
      timeBlock.addClass("past");
    } else if (hour === currentHour) {
      timeBlock.addClass("present");
    } else {
      timeBlock.addClass("future");
    }

    // Load saved events from local storage
    const savedEvent = localStorage.getItem(`event-${hour}`);
    if (savedEvent) {
      timeBlock.find(".description").val(savedEvent);
    }

    // Attach a click event to the save button
    timeBlock.find(".saveBtn").on("click", function () {
      // Get the event text from the corresponding textarea
      const eventText = timeBlock.find(".description").val();

      // Save the event text to local storage with a key based on the hour
      localStorage.setItem(`event-${hour}`, eventText);
    });
  }
});
