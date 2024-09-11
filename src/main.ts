import { LargeNumber } from '@utils/LargeNumber';

/*
 * Основной файл программы, демонстрирующий работу с длинными числами.
 */
const num1 = new LargeNumber('12345678901234567890');
const num2 = new LargeNumber('98765432109876543211');

// Сложение длинных чисел
const sum = LargeNumber.add(num1, num2);
console.log(
  `Сумма: ${num1.toString()} + ${num2.toString()} = ${sum.toString()}`,
);

// Вычитание длинных чисел
const diff = LargeNumber.subtract(num1, num2);
console.log(
  `Разность: ${num1.toString()} - ${num2.toString()} = ${diff.toString()}`,
);
