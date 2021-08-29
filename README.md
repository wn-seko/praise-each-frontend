# praise-each-frontend

## 開発環境

### 必要なパッケージをインストール

```
$ yarn
```

### 起動

```
$ yarn start
```

### Mock サーバーの起動

1.  環境変数を設定する

```
$ export API_URL=localhost:3000
```

アプリをローカルで動かす際の環境変数の管理は direnv を使うと便利。
その際は、 `.envrc.sample` を参考に `.envrc` を作成すること。

2.  Mock サーバーの起動

```
$ yarn start:mock
```

## Hooks

本コードでは一部 Hooks を利用しています。 Hooks の API については以下を参照ください。

[Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)

## CSS の記述と更新

1. style.css に css を記述する
2. `yarn tcm` を実行する
3. `import style from './style.css` でインポートする

## プロダクションビルド

```
$ yarn build
```

## デプロイ

S3 に build ディレクトリをコピー

## Lint

```
$ yarn lint
```

## Test

TODO
