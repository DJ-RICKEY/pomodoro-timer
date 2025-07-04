# Podcast Bot

このボットは、X（旧Twitter）からポッドキャスト関連の情報を抽出するためのツールです。シンプルで使いやすいポモドーロタイマーのウェブアプリケーションではありません。

## セットアップ

1. 必要なパッケージをインストール:
```bash
pip install -r requirements.txt
```

2. Twitter APIの認証情報を取得:
   - Twitter Developer Portalにアクセス
   - 新しいプロジェクトを作成
   - APIキー、アクセストークン、Bearerトークンを取得

3. 環境変数の設定:
   - `.env.example`を`.env`にコピー
   - `.env`ファイルに取得したAPI認証情報を入力

## 使用方法

```bash
python podcast_bot.py
```

## 出力

- 抽出されたポッドキャスト関連の情報は`podcast_data.json`として保存されます
- 各ツイートから以下の情報を抽出:
  - テキスト内容
  - 投稿日時
  - 投稿者のID
  - 含まれるURL
  - ハッシュタグ
  - メンション

## 注意事項

- Twitter APIのレート制限に注意してください
- 抽出されたデータは個人情報保護に配慮して適切に管理してください
