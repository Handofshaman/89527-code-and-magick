'use strict';
/* eslint unicode-bom: "error" */
(function () {
  // Имена волшебников.
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  // Фамилии волшебников.
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  // Цвета плащей.
  var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  // Цвета глаз.
  var WIZARD_EYECOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  // Массив с волшебниками.
  var wizards = [];
  // Список похожих персонажей.
  var similarListElement = document.querySelector('.setup-similar-list');
  // Шаблон мага.
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  // Функция генерации случайного числа.
  function getRandomFloat(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  // Функция создания массива обьектов описывающими четырёх случайных волшебников.
  function getRandomWizard(array, wname, wsurname, wcoatscolor, weyescolor) {
    for (var i = 0; i < 4; i++) {
      var temp = {name: wname[getRandomFloat(0, wname.length - 1)], surname: wsurname[getRandomFloat(0, wsurname.length - 1)], coatColor: wcoatscolor[getRandomFloat(0, wcoatscolor.length - 1)], eyesColor: weyescolor[getRandomFloat(0, weyescolor.length - 1)]};
      array.push(temp);
    }
    return array;
  }
  // Функция создания DOM-элемента на основе JS-объекта.
  function renderWizards(wiz) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wiz.name + ' ' + wiz.surname;
    wizardElement.querySelector('.wizard-coat').style.fill = wiz.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wiz.eyesColor;
    return wizardElement;
  }
  // Функция заполнения блока DOM-элементами на основе массива JS-объектов и записи блока во фрагмент.
  function createWizardFragment(wiz) {
    var frgmnt = document.createDocumentFragment();
    for (var i = 0; i < wiz.length; i++) {
      frgmnt.appendChild(renderWizards(wiz[i]));
    }
    return frgmnt;
  }
  // Показываем настройки персонажа.
  document.querySelector('.setup').classList.remove('hidden');
  // Генерируем четырёх случайных магов.
  getRandomWizard(wizards, WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COATCOLORS, WIZARD_EYECOLORS);
  // Вставляем в нижнюю плашку шаблонных магов.
  similarListElement.appendChild(createWizardFragment(wizards));
  // Показываем нижнюю плашку со списком других персонажей.
  document.querySelector('.setup-similar').classList.remove('hidden');
}());
