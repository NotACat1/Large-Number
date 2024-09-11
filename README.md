# Large Number

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

## Описание

Проект представляет собой класс `LargeNumber` для работы с длинными целыми числами в языке TypeScript. Класс реализует основные арифметические операции (сложение, вычитание, умножение и деление) без использования встроенного типа `BigInt`. Поддерживает работу с отрицательными числами.

## Установка

### Установка Node.js и npm

Для работы с проектом требуется Node.js и npm. Следуйте этим шагам для установки:

1. **Загрузите и установите Node.js:**

   Перейдите на [официальный сайт Node.js](https://nodejs.org/en/download/package-manager) и загрузите установочный пакет для вашей операционной системы. Выберите рекомендованную версию LTS (долгосрочная поддержка) для стабильности.

   - **Windows/macOS**: Загрузите установочный файл и следуйте инструкциям мастера установки.
   - **Linux**: Вы можете использовать менеджер пакетов вашей системы для установки Node.js. Например:

     ```bash
     # Для Debian/Ubuntu
     sudo apt update
     sudo apt install nodejs npm

     # Для CentOS
     sudo yum install nodejs npm
     ```

2. **Проверьте установку:**

   После установки Node.js и npm проверьте их версии, чтобы убедиться, что всё установлено правильно:

   ```bash
   node -v
   npm -v
   ```

   Команды должны вернуть версии Node.js и npm.

3. **Клонируйте репозиторий и установите зависимости:**

   После установки Node.js и npm, выполните следующие шаги:

   ```bash
   git clone https://github.com/NotACat1/Large-Number.git
   cd Large-Number
   npm install
   ```

   Команда `npm install` установит все зависимости проекта, указанные в `package.json`.

## Использование

### Создание объекта

```typescript
import { LargeNumber } from '@utils/LargeNumber';

// Создание объекта с длинным числом
const num1 = new LargeNumber('12345678901234567890');
const num2 = new LargeNumber('-98765432109876543210');
```

### Арифметические операции

#### Сложение

```typescript
const resultAdd = LargeNumber.add(num1, num2);
console.log(resultAdd.toString()); // Выводит результат сложения
```

#### Вычитание

```typescript
const resultSub = LargeNumber.subtract(num1, num2);
console.log(resultSub.toString()); // Выводит результат вычитания
```

#### Умножение

```typescript
const resultMul = LargeNumber.multiply(num1, num2);
console.log(resultMul.toString()); // Выводит результат умножения
```

#### Деление

```typescript
const resultDiv = LargeNumber.divide(num1, num2);
console.log(resultDiv.toString()); // Выводит результат деления
```

## Скрипты

Проект включает несколько скриптов для удобства разработки и управления проектом. Все скрипты указаны в секции `scripts` файла `package.json`. Вот их описание:

### `prepare`

```bash
npm run prepare
```

Этот скрипт устанавливает Husky хуки. Husky используется для автоматической проверки кода перед коммитами. Он выполняется автоматически при установке зависимостей.

### `lint`

```bash
npm run lint
```

Этот скрипт запускает ESLint для проверки файлов на наличие ошибок и предупреждений. Он проверяет все файлы с расширениями `.js` и `.ts` в папке `src`.

### `lint:fix`

```bash
npm run lint:fix
```

Этот скрипт запускает ESLint для исправления автоматически исправимых проблем в коде. Как и `lint`, он проверяет файлы с расширениями `.js` и `.ts` в папке `src`.

### `prettier:check`

```bash
npm run prettier:check
```

Этот скрипт проверяет файлы на соответствие правилам форматирования, установленным Prettier. Он проверяет все файлы с расширениями `.js` и `.ts` в папке `src`.

### `prettier:fix`

```bash
npm run prettier:fix
```

Этот скрипт автоматически форматирует файлы в соответствии с правилами Prettier. Он применяет форматирование к файлам с расширениями `.js` и `.ts` в папке `src`.

### `lint-staged`

```bash
npm run lint-staged
```

Этот скрипт запускает lint-staged, который проверяет только измененные файлы перед коммитом. Это помогает ускорить процесс проверки кода и обеспечить его соответствие стандартам.

### `build`

```bash
npm run build
```

Этот скрипт выполняет сборку проекта. Он компилирует TypeScript код в JavaScript и заменяет пути алиасов с помощью `tsc-alias`.

### `test`

```bash
npm run test
```

Этот скрипт запускает тесты с помощью Jest. Убедитесь, что все тесты проходят успешно перед коммитом кода.

### `start`

```bash
npm run start
```

Этот скрипт запускает скомпилированный проект, исполняя файл `dist/main.js`. Используется для запуска приложения в производственной среде.

### `dev`

```bash
npm run dev
```

Этот скрипт запускает проект в режиме разработки с помощью `nodemon`, который автоматически перезапускает приложение при изменениях в исходных файлах.

## Вклад

Если вы хотите внести вклад в проект, пожалуйста, создайте `pull request` и следуйте стандартам кодирования и проверки кода.
