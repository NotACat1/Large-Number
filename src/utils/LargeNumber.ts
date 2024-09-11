import { ILargeNumber } from '@type/LargeNumber';
import { LargeNumberInput } from '@type/LargeNumberInput';

/**
 * Класс для работы с длинными числами, представленными в виде строк.
 * Реализует базовые арифметические операции: сложение, вычитание, умножение и деление.
 */
export class LargeNumber implements ILargeNumber {
  value: string;
  isNegative: boolean;

  constructor(value: LargeNumberInput) {
    // Определяем знак числа
    const stringValue = String(value);
    this.isNegative = stringValue.startsWith('-');

    // Убираем знак минуса, если число отрицательное
    const normalizedValue = this.isNegative
      ? stringValue.slice(1)
      : stringValue;

    // Если число -0, обрабатываем его как 0
    if (normalizedValue === '0') {
      this.isNegative = false;
    }

    // Нормализуем значение (удаляем ведущие нули)
    this.value = this.normalize(normalizedValue);
  }

  /**
   * Нормализует строковое значение числа (удаляет ведущие нули).
   * @param value - Строковое представление числа
   * @returns Нормализованная строка
   */
  private normalize(value: string): string {
    return value.replace(/^0+/, '') || '0'; // Удаляем ведущие нули
  }

  /**
   * Преобразование длинного числа в строку.
   * @returns Строковое представление числа
   */
  toString(): string {
    return this.isNegative && this.value !== '0'
      ? `-${this.value}`
      : this.value;
  }

  /**
   * Сложение двух длинных чисел.
   * @param a - Первое длинное число
   * @param b - Второе длинное число
   * @returns Новое длинное число, представляющее сумму
   */
  static add(a: LargeNumber, b: LargeNumber): LargeNumber {
    if (a.isNegative && !b.isNegative) {
      return LargeNumber.subtract(b, new LargeNumber(a.value));
    }
    if (!a.isNegative && b.isNegative) {
      return LargeNumber.subtract(a, new LargeNumber(b.value));
    }

    let carry = 0;
    let result = '';

    const aDigits = a.value.split('').reverse();
    const bDigits = b.value.split('').reverse();
    const maxLength = Math.max(aDigits.length, bDigits.length);

    for (let i = 0; i < maxLength; i++) {
      const digitA = parseInt(aDigits[i] || '0', 10);
      const digitB = parseInt(bDigits[i] || '0', 10);
      const sum = digitA + digitB + carry;

      result = (sum % 10) + result;
      carry = Math.floor(sum / 10);
    }

    if (carry > 0) {
      result = carry + result;
    }

    const isNegative = a.isNegative && b.isNegative;
    return new LargeNumber((isNegative ? '-' : '') + result);
  }

  /**
   * Вычитание второго длинного числа из первого.
   * @param a - Первое длинное число
   * @param b - Второе длинное число
   * @returns Результат вычитания
   */
  static subtract(a: LargeNumber, b: LargeNumber): LargeNumber {
    if (a.isNegative && !b.isNegative) {
      return new LargeNumber(
        '-' + LargeNumber.add(new LargeNumber(a.value), b).value,
      );
    }
    if (!a.isNegative && b.isNegative) {
      return LargeNumber.add(a, new LargeNumber(b.value));
    }
    if (a.isNegative && b.isNegative) {
      return LargeNumber.subtract(
        new LargeNumber(b.value),
        new LargeNumber(a.value),
      );
    }

    if (LargeNumber.compare(a, b) < 0) {
      return new LargeNumber('-' + LargeNumber.subtract(b, a).value);
    }

    let borrow = 0;
    let result = '';

    const aDigits = a.value.split('').reverse();
    const bDigits = b.value.split('').reverse();

    for (let i = 0; i < aDigits.length; i++) {
      const digitA = parseInt(aDigits[i], 10);
      const digitB = parseInt(bDigits[i] || '0', 10) + borrow;
      let diff = digitA - digitB;

      if (diff < 0) {
        diff += 10;
        borrow = 1;
      } else {
        borrow = 0;
      }

      result = diff + result;
    }

    return new LargeNumber(result);
  }

  /**
   * Умножение двух длинных чисел.
   * @param a - Первое длинное число
   * @param b - Второе длинное число
   * @returns Результат умножения
   */
  static multiply(a: LargeNumber, b: LargeNumber): LargeNumber {
    const aDigits = a.value.split('').reverse();
    const bDigits = b.value.split('').reverse();
    const resultArray = Array(aDigits.length + bDigits.length).fill(0);

    for (let i = 0; i < aDigits.length; i++) {
      for (let j = 0; j < bDigits.length; j++) {
        const product = parseInt(aDigits[i], 10) * parseInt(bDigits[j], 10);
        const sum = resultArray[i + j] + product;
        resultArray[i + j] = sum % 10;
        resultArray[i + j + 1] += Math.floor(sum / 10);
      }
    }

    const result = resultArray.reverse().join('').replace(/^0+/, '') || '0';
    const isNegative = a.isNegative !== b.isNegative;
    return new LargeNumber((isNegative ? '-' : '') + result);
  }

  /**
   * Деление двух длинных чисел с округлением вниз.
   * @param a - Делимое
   * @param b - Делитель
   * @returns Результат целочисленного деления
   */
  static divide(a: LargeNumber, b: LargeNumber): LargeNumber {
    if (b.value === '0') {
      throw new Error('Деление на ноль невозможно');
    }

    const dividend = a.value;
    const divisor = b.value;
    let result = '';
    let current = '';

    for (let i = 0; i < dividend.length; i++) {
      current += dividend[i];
      let quotient = 0;

      while (
        LargeNumber.compare(
          new LargeNumber(current),
          new LargeNumber(divisor),
        ) >= 0
      ) {
        current = LargeNumber.subtract(
          new LargeNumber(current),
          new LargeNumber(divisor),
        ).toString();
        quotient++;
      }

      result += quotient;
    }

    const isNegative = a.isNegative !== b.isNegative;
    return new LargeNumber((isNegative ? '-' : '') + result || '0');
  }

  /**
   * Сравнение двух длинных чисел.
   * @param a - Первое число
   * @param b - Второе число
   * @returns -1 если меньше, 0 если равно, 1 если больше
   */
  static compare(a: LargeNumber, b: LargeNumber): number {
    if (a.isNegative && !b.isNegative) return -1;
    if (!a.isNegative && b.isNegative) return 1;
    if (a.isNegative && b.isNegative) {
      const compare = LargeNumber.compare(
        new LargeNumber(a.value),
        new LargeNumber(b.value),
      );
      return compare == 0 ? compare : compare * -1;
    }

    if (a.value.length < b.value.length) return -1;
    if (a.value.length > b.value.length) return 1;
    return a.value.localeCompare(b.value);
  }
}
