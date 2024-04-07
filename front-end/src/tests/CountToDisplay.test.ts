import { countToDisplay } from "../function/CountToDisplay";

test('Should format 1 as 1', () => {
    let number = 1;
    let expected = 1;

    let actual = countToDisplay(number);

    expect(actual).toBe(expected);
})

test('Should format 1000 as 1K', () => {
    let number = 1000;
    let expected = '1K';

    let actual = countToDisplay(number);

    expect(actual).toBe(expected);
})

test('Should format 1000000 as 1M', () => {
    let number = 1000000;
    let expected = '1M';

    let actual = countToDisplay(number);

    expect(actual).toBe(expected);
})

test('Should format 1000000000 as 1B', () => {
    let number = 1000000000;
    let expected = '1B';

    let actual = countToDisplay(number);

    expect(actual).toBe(expected);
})