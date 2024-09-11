import { LargeNumber } from './LargeNumber';

describe('LargeNumber', () => {
  // Тестирование конструктора
  describe('constructor', () => {
    it('должен корректно обрабатывать положительное число', () => {
      const num = new LargeNumber('12345');
      expect(num.value).toBe('12345');
      expect(num.isNegative).toBe(false);
    });

    it('должен корректно обрабатывать отрицательное число', () => {
      const num = new LargeNumber('-98765');
      expect(num.value).toBe('98765');
      expect(num.isNegative).toBe(true);
    });

    it('должен удалять ведущие нули у положительных чисел', () => {
      const num = new LargeNumber('0000012345');
      expect(num.value).toBe('12345');
      expect(num.isNegative).toBe(false);
    });

    it('должен удалять ведущие нули у отрицательных чисел', () => {
      const num = new LargeNumber('-000098765');
      expect(num.value).toBe('98765');
      expect(num.isNegative).toBe(true);
    });

    it('должен обрабатывать ноль как положительное число', () => {
      const num = new LargeNumber('0000000');
      expect(num.value).toBe('0');
      expect(num.isNegative).toBe(false);
    });

    it('должен обрабатывать отрицательный ноль как положительное число', () => {
      const num = new LargeNumber('-0');
      expect(num.value).toBe('0');
      expect(num.isNegative).toBe(false);
    });
  });

  // Сложение
  describe('Add', () => {
    it('должен корректно складывать два положительных числа', () => {
      const a = new LargeNumber('12345');
      const b = new LargeNumber('67890');
      const result = LargeNumber.add(a, b);
      expect(result.toString()).toBe('80235');
    });

    it('должен корректно складывать два больших числа', () => {
      const a = new LargeNumber('999999999999999999999');
      const b = new LargeNumber('1');
      const result = LargeNumber.add(a, b);
      expect(result.toString()).toBe('1000000000000000000000');
    });

    it('должен корректно складывать число с нулем', () => {
      const a = new LargeNumber('12345');
      const b = new LargeNumber('0');
      const result = LargeNumber.add(a, b);
      expect(result.toString()).toBe('12345');
    });

    it('должен корректно складывать два нуля', () => {
      const a = new LargeNumber('0');
      const b = new LargeNumber('0');
      const result = LargeNumber.add(a, b);
      expect(result.toString()).toBe('0');
    });

    it('должен корректно складывать положительное и отрицательное число (положительное больше)', () => {
      const a = new LargeNumber('10000');
      const b = new LargeNumber('-2345');
      const result = LargeNumber.add(a, b);
      expect(result.toString()).toBe('7655');
    });

    it('должен корректно складывать положительное и отрицательное число (отрицательное больше)', () => {
      const a = new LargeNumber('2345');
      const b = new LargeNumber('-10000');
      const result = LargeNumber.add(a, b);
      expect(result.toString()).toBe('-7655');
    });

    it('должен корректно складывать два отрицательных числа', () => {
      const a = new LargeNumber('-12345');
      const b = new LargeNumber('-67890');
      const result = LargeNumber.add(a, b);
      expect(result.toString()).toBe('-80235');
    });

    it('должен корректно складывать отрицательное число с нулем', () => {
      const a = new LargeNumber('-12345');
      const b = new LargeNumber('0');
      const result = LargeNumber.add(a, b);
      expect(result.toString()).toBe('-12345');
    });

    it('должен корректно складывать два больших отрицательных числа', () => {
      const a = new LargeNumber('-999999999999999999999');
      const b = new LargeNumber('-1');
      const result = LargeNumber.add(a, b);
      expect(result.toString()).toBe('-1000000000000000000000');
    });
  });

  // Вычитание
  describe('Subtract', () => {
    it('должен корректно вычитать меньшее положительное число из большего', () => {
      const a = new LargeNumber('12345');
      const b = new LargeNumber('5432');
      const result = LargeNumber.subtract(a, b);
      expect(result.toString()).toBe('6913');
    });

    it('должен корректно вычитать большее положительное число из меньшего', () => {
      const a = new LargeNumber('5432');
      const b = new LargeNumber('12345');
      const result = LargeNumber.subtract(a, b);
      expect(result.toString()).toBe('-6913');
    });

    it('должен корректно вычитать одинаковые положительные числа', () => {
      const a = new LargeNumber('54321');
      const b = new LargeNumber('54321');
      const result = LargeNumber.subtract(a, b);
      expect(result.toString()).toBe('0');
    });

    it('должен корректно вычитать отрицательное число из положительного', () => {
      const a = new LargeNumber('12345');
      const b = new LargeNumber('-5432');
      const result = LargeNumber.subtract(a, b);
      expect(result.toString()).toBe('17777');
    });

    it('должен корректно вычитать положительное число из отрицательного', () => {
      const a = new LargeNumber('-12345');
      const b = new LargeNumber('5432');
      const result = LargeNumber.subtract(a, b);
      expect(result.toString()).toBe('-17777');
    });

    it('должен корректно вычитать отрицательное число из отрицательного', () => {
      const a = new LargeNumber('-12345');
      const b = new LargeNumber('-5432');
      const result = LargeNumber.subtract(a, b);
      expect(result.toString()).toBe('-6913');
    });

    it('должен корректно вычитать меньшее отрицательное число из большего отрицательного', () => {
      const a = new LargeNumber('-5432');
      const b = new LargeNumber('-12345');
      const result = LargeNumber.subtract(a, b);
      expect(result.toString()).toBe('6913');
    });

    it('должен корректно вычитать ноль из положительного числа', () => {
      const a = new LargeNumber('5432');
      const b = new LargeNumber('0');
      const result = LargeNumber.subtract(a, b);
      expect(result.toString()).toBe('5432');
    });

    it('должен корректно вычитать ноль из отрицательного числа', () => {
      const a = new LargeNumber('-5432');
      const b = new LargeNumber('0');
      const result = LargeNumber.subtract(a, b);
      expect(result.toString()).toBe('-5432');
    });

    it('должен корректно вычитать положительное число из нуля', () => {
      const a = new LargeNumber('0');
      const b = new LargeNumber('5432');
      const result = LargeNumber.subtract(a, b);
      expect(result.toString()).toBe('-5432');
    });

    it('должен корректно вычитать отрицательное число из нуля', () => {
      const a = new LargeNumber('0');
      const b = new LargeNumber('-5432');
      const result = LargeNumber.subtract(a, b);
      expect(result.toString()).toBe('5432');
    });
  });

  describe('Divide', () => {
    it('должен корректно делить два положительных числа', () => {
      const a = new LargeNumber('100');
      const b = new LargeNumber('25');
      const result = LargeNumber.divide(a, b);
      expect(result.toString()).toBe('4');
    });

    it('должен возвращать 0, если делимое меньше делителя', () => {
      const a = new LargeNumber('5');
      const b = new LargeNumber('10');
      const result = LargeNumber.divide(a, b);
      expect(result.toString()).toBe('0');
    });

    it('должен корректно округлять вниз при делении', () => {
      const a = new LargeNumber('10');
      const b = new LargeNumber('3');
      const result = LargeNumber.divide(a, b);
      expect(result.toString()).toBe('3'); // 10 / 3 = 3 с округлением вниз
    });

    it('должен корректно делить два отрицательных числа', () => {
      const a = new LargeNumber('-100');
      const b = new LargeNumber('-25');
      const result = LargeNumber.divide(a, b);
      expect(result.toString()).toBe('4'); // -100 / -25 = 4
    });

    it('должен корректно делить отрицательное число на положительное', () => {
      const a = new LargeNumber('-100');
      const b = new LargeNumber('25');
      const result = LargeNumber.divide(a, b);
      expect(result.toString()).toBe('-4'); // -100 / 25 = -4
    });

    it('должен корректно делить положительное число на отрицательное', () => {
      const a = new LargeNumber('100');
      const b = new LargeNumber('-25');
      const result = LargeNumber.divide(a, b);
      expect(result.toString()).toBe('-4'); // 100 / -25 = -4
    });

    it('должен возвращать исходное число при делении на 1', () => {
      const a = new LargeNumber('123456');
      const b = new LargeNumber('1');
      const result = LargeNumber.divide(a, b);
      expect(result.toString()).toBe('123456');
    });

    it('должен корректно возвращать отрицательное число при делении на -1', () => {
      const a = new LargeNumber('123456');
      const b = new LargeNumber('-1');
      const result = LargeNumber.divide(a, b);
      expect(result.toString()).toBe('-123456');
    });

    it('должен возвращать 0 при делении 0 на любое число', () => {
      const a = new LargeNumber('0');
      const b = new LargeNumber('123');
      const result = LargeNumber.divide(a, b);
      expect(result.toString()).toBe('0');
    });

    it('должен выбрасывать ошибку при делении на 0', () => {
      const a = new LargeNumber('123');
      const b = new LargeNumber('0');
      expect(() => LargeNumber.divide(a, b)).toThrowError(
        'Деление на ноль невозможно',
      );
    });
  });

  describe('Compare', () => {
    it('должен вернуть 0 для двух одинаковых положительных чисел', () => {
      const a = new LargeNumber('123456789');
      const b = new LargeNumber('123456789');
      expect(LargeNumber.compare(a, b)).toBe(0);
    });

    it('должен вернуть 1, если первое число больше второго (положительные числа)', () => {
      const a = new LargeNumber('987654321');
      const b = new LargeNumber('123456789');
      expect(LargeNumber.compare(a, b)).toBe(1);
    });

    it('должен вернуть -1, если первое число меньше второго (положительные числа)', () => {
      const a = new LargeNumber('123456789');
      const b = new LargeNumber('987654321');
      expect(LargeNumber.compare(a, b)).toBe(-1);
    });

    it('должен вернуть -1, если первое число отрицательное, а второе положительное', () => {
      const a = new LargeNumber('-123456789');
      const b = new LargeNumber('123456789');
      expect(LargeNumber.compare(a, b)).toBe(-1);
    });

    it('должен вернуть 1, если первое число положительное, а второе отрицательное', () => {
      const a = new LargeNumber('123456789');
      const b = new LargeNumber('-123456789');
      expect(LargeNumber.compare(a, b)).toBe(1);
    });

    it('должен вернуть 0 для двух одинаковых отрицательных чисел', () => {
      const a = new LargeNumber('-987654321');
      const b = new LargeNumber('-987654321');
      expect(LargeNumber.compare(a, b)).toBe(0);
    });

    it('должен вернуть -1, если первое число меньше второго (отрицательные числа)', () => {
      const a = new LargeNumber('-987654321');
      const b = new LargeNumber('-123456789');
      expect(LargeNumber.compare(a, b)).toBe(-1);
    });

    it('должен вернуть 1, если первое число больше второго (отрицательные числа)', () => {
      const a = new LargeNumber('-123456789');
      const b = new LargeNumber('-987654321');
      expect(LargeNumber.compare(a, b)).toBe(1);
    });

    it('должен корректно сравнивать положительное число с ведущими нулями', () => {
      const a = new LargeNumber('00123456789');
      const b = new LargeNumber('123456789');
      expect(LargeNumber.compare(a, b)).toBe(0);
    });

    it('должен вернуть -1, если первое число меньше второго (разная длина чисел)', () => {
      const a = new LargeNumber('12345');
      const b = new LargeNumber('123456789');
      expect(LargeNumber.compare(a, b)).toBe(-1);
    });

    it('должен вернуть 1, если первое число больше второго (разная длина чисел)', () => {
      const a = new LargeNumber('123456789');
      const b = new LargeNumber('12345');
      expect(LargeNumber.compare(a, b)).toBe(1);
    });

    it('должен корректно сравнивать числа с нулями (0 vs отрицательные)', () => {
      const a = new LargeNumber('0');
      const b = new LargeNumber('-12345');
      expect(LargeNumber.compare(a, b)).toBe(1);
    });

    it('должен корректно сравнивать числа с нулями (0 vs положительные)', () => {
      const a = new LargeNumber('0');
      const b = new LargeNumber('12345');
      expect(LargeNumber.compare(a, b)).toBe(-1);
    });

    it('должен возвращать 0 при сравнении двух нулей', () => {
      const a = new LargeNumber('0');
      const b = new LargeNumber('0');
      expect(LargeNumber.compare(a, b)).toBe(0);
    });
  });
});
