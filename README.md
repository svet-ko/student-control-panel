# Student-control-panel
A training project enhance Javascript skills of working with arrays and their methods, as well as manipulating the DOM.
The layout is made using the ready-made Bootstrap library for styles.
All user changes are stored in local storage.

A student control panel has been created, which contains a table with students with filters and sorting and a form for adding a new student. Students are stored in an array. Every student is an object.

To add students, a form is displayed on the page with fields corresponding to the student's data. The form is being validated. If the validation is successful, then all fields are cleared and a new student is added to the table. Otherwise, a message is displayed above the button describing the errors for the user.

The data from the array is displayed in tabular form. Each row of the table contains information about one student. The first row of the table is the header row, it contains the column headings. When you click on a header cell, the students are sorted according to the corresponding fields.

Filters are also displayed before the table. With any changes in the fields for filtering, the contents of the table are changed in accordance with the specified filters. If multiple filters are specified, they are all applied to the student array in turn.

Link to the Github pages: [https://svet-ko.github.io/student-control-panel/](https://svet-ko.github.io/student-control-panel/)
