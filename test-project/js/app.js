// DOMが完全に読み込まれてから実行
document.addEventListener('DOMContentLoaded', () => {
    try {
        // カウンターのステート管理
        class CounterState {
            constructor(initialValue = 0) {
                this.value = initialValue;
                this.listeners = new Set();
            }

            // 値の更新と通知
            setValue(newValue) {
                if (typeof newValue !== 'number') {
                    throw new Error('カウンターの値は数値である必要があります');
                }
                this.value = newValue;
                this.notifyListeners();
            }

            // リスナーの登録
            addListener(listener) {
                this.listeners.add(listener);
            }

            // リスナーへの通知
            notifyListeners() {
                this.listeners.forEach(listener => listener(this.value));
            }
        }

        // UIコンポーネント
        class CounterUI {
            constructor(counterState) {
                this.state = counterState;
                this.elements = {
                    count: document.getElementById('count'),
                    decrement: document.getElementById('decrement'),
                    increment: document.getElementById('increment')
                };

                // 要素の存在確認
                Object.entries(this.elements).forEach(([key, element]) => {
                    if (!element) {
                        throw new Error(`必要な要素が見つかりません: ${key}`);
                    }
                });

                this.initializeEventListeners();
            }

            // イベントリスナーの初期化
            initializeEventListeners() {
                this.elements.decrement.addEventListener('click', () => {
                    this.state.setValue(this.state.value - 1);
                });

                this.elements.increment.addEventListener('click', () => {
                    this.state.setValue(this.state.value + 1);
                });

                // キーボードイベントの追加（アクセシビリティ向上）
                document.addEventListener('keydown', (event) => {
                    switch (event.key) {
                        case 'ArrowDown':
                        case 'ArrowLeft':
                            this.state.setValue(this.state.value - 1);
                            break;
                        case 'ArrowUp':
                        case 'ArrowRight':
                            this.state.setValue(this.state.value + 1);
                            break;
                    }
                });

                // 表示の更新
                this.state.addListener((value) => {
                    this.elements.count.textContent = value;
                });
            }
        }

        // アプリケーションの初期化
        const counterState = new CounterState(0);
        const ui = new CounterUI(counterState);

    } catch (error) {
        console.error('アプリケーションの初期化中にエラーが発生しました:', error);
        // エラーメッセージをUIに表示
        const container = document.querySelector('.container');
        if (container) {
            container.innerHTML = `
                <div class="error">
                    <p>エラーが発生しました:</p>
                    <p>${error.message}</p>
                </div>
            `;
        }
    }
});

// テストコード（開発環境でのみ実行）
if (typeof module !== 'undefined' && module.exports) {
    class CounterState {
        constructor(initialValue = 0) {
            this.value = initialValue;
            this.listeners = new Set();
        }

        setValue(newValue) {
            if (typeof newValue !== 'number') {
                throw new Error('カウンターの値は数値である必要があります');
            }
            this.value = newValue;
            this.notifyListeners();
        }

        addListener(listener) {
            this.listeners.add(listener);
        }

        notifyListeners() {
            this.listeners.forEach(listener => listener(this.value));
        }
    }

    module.exports = { CounterState };
}