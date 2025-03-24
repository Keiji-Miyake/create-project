const { CounterState } = require('./app.js');

describe('CounterState', () => {
    let counterState;
    let mockListener;

    beforeEach(() => {
        counterState = new CounterState(0);
        mockListener = jest.fn();
    });

    test('初期値が正しく設定されること', () => {
        expect(counterState.value).toBe(0);
    });

    test('値が正しく更新されること', () => {
        counterState.setValue(5);
        expect(counterState.value).toBe(5);
    });

    test('不正な値がセットされた場合にエラーを投げること', () => {
        expect(() => {
            counterState.setValue('不正な値');
        }).toThrow('カウンターの値は数値である必要があります');
    });

    test('リスナーが正しく通知されること', () => {
        counterState.addListener(mockListener);
        counterState.setValue(10);
        expect(mockListener).toHaveBeenCalledWith(10);
    });
});