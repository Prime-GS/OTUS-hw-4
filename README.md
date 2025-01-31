# Программа Индексации Текста

Программа читает текстовый файл, индексирует содержащиеся в нём слова и выводит результат в другой файл.

## Возможности

- Чтение текстового файла построчно, что снижает использование памяти.
- Фильтрация символов, не являющихся буквами, и регистронезависимая обработка слов.
- Генерация индекса частоты встречаемости слов с сортировкой в алфавитном порядке.
- Вывод индекса в JSON-формате и в виде массива частот.

## Установка

1. Склонируйте репозиторий или скачайте файлы проекта.

```bash
git clone git@github.com:Prime-GS/OTUS-hw-4.git
```
 
2. Установите зависимости (если потребуется).

```bash
npm install
```

## Использование

Для корректной работы нужен txt файл с которого будет читатьтся информация 

Чтобы запустить программу, выполните команду:

```bash
node index.js <входной_файл> <выходной_файл>
```

Где:
- `<входной_файл>` — это путь к текстовому файлу, который необходимо проиндексировать.
- `<выходной_файл>` — это путь к файлу, в который будет записан результат.

Пример:

```bash
node index.js input.txt output.txt
```

## Формат Выходных Данных

Результат работы программы выводится в двух форматах:
1. **JSON-объект** с количеством встречаемости каждого слова.
2. **Массив** частот встречаемости слов в алфавитном порядке.

Пример выходных данных:

```json
{
  "a": 1,
  "b": 2,
  "c": 1
}

[1, 2, 1]
```

## Обработка ошибок

Если программа не может прочитать или записать файл, будет выведено сообщение об ошибке.
