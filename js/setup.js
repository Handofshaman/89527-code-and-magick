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
  function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  // Функция создания обьекта описывающего мага.
  function createRandomWizard(wName, wSurname, wCoatColors, wEyesColors) {
    var templateWizard = {
      name: wName[getRandomNumber(0, wName.length - 1)],
      surname: wSurname[getRandomNumber(0, wSurname.length - 1)],
      coatColor: wCoatColors[getRandomNumber(0, wCoatColors.length - 1)],
      eyesColor: wEyesColors[getRandomNumber(0, wEyesColors.length - 1)]
    };
    return templateWizard;
  }
  // Функция создания DOM-элемента на основе JS-объекта.
  function renderWizards(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  }
  // Функция заполнения блока DOM-элементами на основе массива JS-объектов и записи блока во фрагмент.
  function createWizardFragment(wizard) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizard.length; i++) {
      fragment.appendChild(renderWizards(wizard[i]));
    }
    return fragment;
  }
  // Показываем настройки персонажа.
  document.querySelector('.setup').classList.remove('hidden');
  // Генерируем четырёх случайных магов.
  for (var i = 0; i < 4; i++) {
    wizards.push(createRandomWizard(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COATCOLORS, WIZARD_EYECOLORS));
  }
  // Вставляем в нижнюю плашку шаблонных магов.
  similarListElement.appendChild(createWizardFragment(wizards));
  // Показываем нижнюю плашку со списком других персонажей.
  document.querySelector('.setup-similar').classList.remove('hidden');
}());
