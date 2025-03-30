## プロジェクト規約

### 1. 設計原則
- **SOLIDの原則の徹底**
  - Single Responsibility（単一責任）: 1クラス/モジュールは1責務。変更理由は常に1つ。
  - Open-Closed（開放閉鎖）: 拡張に開かれ、修正に閉じる。既存コード変更なしで機能追加。
  - Liskov Substitution（リスコフの置換）: 派生クラスは基底クラスと完全置換可能。型の一貫性保証。
  - Interface Segregation（インターフェース分離）: インターフェースは小さく。不要メソッド強制しない。
  - Dependency Inversion（依存性逆転）: 上位は下位に依存せず、両者は抽象に依存。
- **その他の設計原則**
  - DRY (Don't Repeat Yourself): コード重複回避。共通処理は抽象化。
  - KISS (Keep It Simple, Stupid): 単純で理解しやすい実装。過度な抽象化回避。
  - YAGNI (You Aren't Gonna Need It): 必要になるまで実装しない。過度な機能追加回避。

### 2. アーキテクチャと構成
- **アーキテクチャパターン**
  - クリーンアーキテクチャ / レイヤードアーキテクチャを基本とする。
    - 依存関係は内側へ。ビジネスロジックは外部依存から独立。
    - Layers: Entities, Use Cases, Interface Adapters, Frameworks & Drivers (Clean) or Presentation, Application, Domain, Infrastructure (Layered)
- **ディレクトリ構成 (モノレポ方針)**
  - ルートに `packages/` ディレクトリを配置し、各機能モジュールやライブラリを格納。
    - 例: `packages/core`, `packages/ui-components`, `packages/feature-a`
  - アプリケーション固有のコードは `apps/` ディレクトリに配置。
    - 例: `apps/web-app`, `apps/docs`
  - 共有設定 (tsconfig, eslint等) はルートに配置し、各パッケージ/アプリから参照。
  - `test-project` のような実験的コードは `examples/` や `apps/` 下に整理。

### 3. デザインパターン
- 必要に応じて適切なデザインパターンを適用。
- **生成パターン例:** Factory Method, Singleton, Builder
- **構造パターン例:** Adapter, Decorator, Composite
- **振る舞いパターン例:** Observer, Strategy, Command