(() => {
  const page = document.querySelector('.page');
  const table = page.querySelector('.table');
  const tableBody = table.querySelector('.table__body');
  const popup = document.querySelector('.popup');
  const popupForm = popup.querySelector('.popup__form');
  const filterForm = page.querySelector('.filter-form');
  let studentList = [];
  let arrayToShow = [];
  let filtered = false;

  function getLocalStorageByKey(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  function setLocalStorage(tmpArray) {
    localStorage.setItem(window.keyToDo, JSON.stringify(tmpArray));
  }

  function addHidden(){
    popup.classList.add('popup_hidden');
  }

  function openPopup() {
    popup.classList.remove('popup_hidden');
    popup.classList.remove('popup_fade');
    popup.classList.add('popup_opened');
  }

  function closePopup() {
    popup.classList.remove('popup_opened');
    popup.classList.add('popup_fade');
    popupForm.reset();
    setTimeout(addHidden, 355);
  }

  const closePopupByClickOnOverlay = function(e) {
    if (e.target === e.currentTarget) {
      closePopup()
    }
    return;
  }

  function createStudent(studentObj) {
    let tableRow = document.createElement('tr');
    let rowNumCell = document.createElement('th');
    let nameCell = document.createElement('td');
    let birthDateCell = document.createElement('td');
    let enterYearCell = document.createElement('td');
    let depCell = document.createElement('td');

    rowNumCell.textContent = studentList.indexOf(studentObj) + 1;
    nameCell.textContent = studentObj.name;
    birthDateCell.textContent = `${studentObj.birthDate} ${studentObj.age} years old`;
    enterYearCell.textContent = studentObj.educYears;
    depCell.textContent = studentObj.dep;

    tableRow.append(rowNumCell);
    tableRow.append(nameCell);
    tableRow.append(birthDateCell);
    tableRow.append(enterYearCell);
    tableRow.append(depCell);
    tableBody.append(tableRow);
  }

  function countCourse(year) {
    let thisYear =  new Date().getFullYear();
    let month = new Date().getMonth();
    if ((thisYear - year) > 4) {
      return 'graduated';
    }
    if ((thisYear - year) === 4 && month > 8) {
      return 'graduated';
    }
    return (thisYear - year) ? thisYear - year : 1;
  }

  function calculateAge(birthday) {
    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  function addPopupEventListener() {
    function formSubmitHandler(e) {
      e.preventDefault();
      let inputName = popupForm.querySelector('.popup__form-item_type_name');
      let inputMidname = popupForm.querySelector('.popup__form-item_type_midname');
      let inputSurname = popupForm.querySelector('.popup__form-item_type_surname');
      let inputBirthDate = popupForm.querySelector('.popup__form-item_type_birth-date');
      let inputEnterYear = popupForm.querySelector('.popup__form-item_type_enter-year');
      let inputDep = popupForm.querySelector('.popup__form-item_type_dep');
      inputName = inputName.value.trim();
      inputMidname = inputMidname.value.trim();
      inputSurname = inputSurname.value.trim();
      inputBirthDate = inputBirthDate.value.trim();
      let birthday = new Date(inputBirthDate);
      inputEnterYear = inputEnterYear.value.trim();
      inputDep = inputDep.value.trim();
      console.log(inputBirthDate);
      if (inputName !== '' && inputMidname !== '' && inputSurname !== '' && inputBirthDate !== '' && inputEnterYear !== '' && inputDep !== '') {
        if (birthday < (new Date('1900-01-01')) || birthday > (new Date())) {
          alert('Дата рождения находится в диапазоне от 01.01.1900 до текущей даты');
          return;
        }
        if (parseInt(inputEnterYear) < 2000 || parseInt(inputEnterYear) > (new Date()).getFullYear()) {
          alert('Год начала обучения должен находиться в диапазоне от 2000-го до текущего года');
          return;
        }
        const student = {};
        student.name = `${inputName} ${inputMidname} ${inputSurname}`;
        student.birthDate = inputBirthDate;
        student.age = calculateAge(birthday);
        student.enterYear = inputEnterYear;
        student.educYears = `${student.enterYear}-${parseInt(student.enterYear) + 4} (${countCourse(student.enterYear)})`;
        student.dep = inputDep;
        studentList.push(student);
        arrayToShow.push(student);
        if (filtered) {
          console.log(filtered);
          findfilterValues();
        }
        if (arrayToShow.includes(student)) {
          createStudent(student);
        }
        closePopup();
        return student;
    }
      alert('Все поля должны быть заполнены');
      return;
    }

    popup.addEventListener('submit', formSubmitHandler);
  }

  function clearTableBody() {
    tableBody.innerHTML = '';
  }

  function createStudentsTable(studentArr) {
    clearTableBody();
    if (studentArr) {
      arrayToShow = studentArr.slice();
    }
    arrayToShow.forEach((student) => {createStudent(student);});
  }

  function sortStudents(category) {
    arrayToShow.sort((a,b) => {return (a[category] > b[category]) ? 1: -1});
    createStudentsTable(arrayToShow);
  }

  function addButtonsClickListeners() {
    const depButton = table.querySelector('.table__button_type_dep');
    const enterYearButton = table.querySelector('.table__button_type_enter-year');
    const nameButton = table.querySelector('.table__button_type_name');
    const birthdayButton = table.querySelector('.table__button_type_birth-date');
    const closeButton = popup.querySelector('.popup__close-button');
    const editButton = page.querySelector('.page__add-button');
    const removeFiltersButton = page.querySelector('.remove-filters-button');

    removeFiltersButton.addEventListener('click', () => createStudentsTable(studentList));

    depButton.addEventListener('click', () => {sortStudents('dep')});
    enterYearButton.addEventListener('click', () => {sortStudents('enterYear')});
    nameButton.addEventListener('click', () => {sortStudents('name')});
    birthdayButton.addEventListener('click', () => {sortStudents('birthDate')});

    editButton.addEventListener('click', openPopup);
    closeButton.addEventListener('click', closePopup);
    popup.addEventListener('click', closePopupByClickOnOverlay);
  }

  function filterStudents(filterItem, arrToFilter) {
    function isFiltered(student) {
      switch (filterItem.id) {
        case 'name':
          if (student.name.includes(filterItem.value)) {
            filtered = true;
            return filtered;
          };
          break;
        case 'department':
          if (student.dep.includes(filterItem.value)) {
            filtered = true;
            return filtered;
          };
          break;
        case 'enter':
          if (student.enterYear.includes(filterItem.value)) {
            filtered = true;
            return filtered;
          };
          break;
        case 'birthday':
          if (student.birthDate.includes(filterItem.value)) {
            filtered = true;
            return filtered;
          };
          break;
      }
    }
    arrToFilter = arrToFilter.filter(student => isFiltered(student));
    return arrToFilter;
  }

  function findfilterValues() {
    arrayToShow = studentList.slice();
    for (let item of filterForm) {
      if (item.value) {
        arrayToShow = filterStudents(item, arrayToShow);
      }
    }
  }

  function addFilterInputSubmitListeners() {
    function filterFormSubmitHandler(e) {
      e.preventDefault();
      findfilterValues()
      createStudentsTable(arrayToShow);
    }
    filterForm.addEventListener('submit', filterFormSubmitHandler);
  }

  function closingCode() {
    setLocalStorage(studentList);
  }

  window.onbeforeunload = closingCode;
  window.getLocalStorageByKey = getLocalStorageByKey;

  document.addEventListener('DOMContentLoaded', function() {
    window.keyToDo='memStudents';
    const studentsFromStorage = getLocalStorageByKey(window.keyToDo);
    if (studentsFromStorage !== null){
      studentList = studentsFromStorage;
    }
    createStudentsTable(studentList);
    addPopupEventListener();
    addButtonsClickListeners();
    addFilterInputSubmitListeners();
  });
})()
