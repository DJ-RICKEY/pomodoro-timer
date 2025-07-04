import os
import tweepy
from datetime import datetime, timedelta
import json
from dotenv import load_dotenv

# 環境変数の読み込み
load_dotenv()

def create_client():
    """Twitter APIクライアントの作成"""
    client = tweepy.Client(
        bearer_token=os.getenv('BEARER_TOKEN'),
        consumer_key=os.getenv('API_KEY'),
        consumer_secret=os.getenv('API_KEY_SECRET'),
        access_token=os.getenv('ACCESS_TOKEN'),
        access_token_secret=os.getenv('ACCESS_TOKEN_SECRET')
    )
    return client

def extract_podcast_info(tweet):
    """ツイートからポッドキャスト関連情報を抽出"""
    podcast_info = {}
    
    # リンクの抽出
    if 'urls' in tweet.entities:
        podcast_info['urls'] = [url['expanded_url'] for url in tweet.entities['urls']]
    
    # ハッシュタグの抽出
    if 'hashtags' in tweet.entities:
        podcast_info['hashtags'] = [hashtag['tag'] for hashtag in tweet.entities['hashtags']]
    
    # メンションの抽出
    if 'mentions' in tweet.entities:
        podcast_info['mentions'] = [mention['username'] for mention in tweet.entities['mentions']]
    
    # テキストの抽出
    podcast_info['text'] = tweet.text
    podcast_info['created_at'] = tweet.created_at.isoformat()
    podcast_info['author_id'] = tweet.author_id
    
    return podcast_info

def main():
    client = create_client()
    
    # ポッドキャスト関連のキーワード
    keywords = ['podcast', 'ポッドキャスト', '#podcast', '#ポッドキャスト']
    
    # 最新のツイートを取得（過去7日間）
    start_time = datetime.utcnow() - timedelta(days=7)
    
    try:
        # ポッドキャスト関連のツイートを検索
        tweets = client.search_recent_tweets(
            query=' OR '.join(keywords),
            max_results=100,
            start_time=start_time
        )
        
        # 抽出した情報を保存
        podcast_data = []
        for tweet in tweets.data:
            podcast_info = extract_podcast_info(tweet)
            podcast_data.append(podcast_info)
        
        # JSONファイルとして保存
        with open('podcast_data.json', 'w', encoding='utf-8') as f:
            json.dump(podcast_data, f, ensure_ascii=False, indent=2)
        
        print(f"ポッドキャスト関連のツイートを{len(podcast_data)}件抽出しました")
        
    except Exception as e:
        print(f"エラーが発生しました: {str(e)}")

if __name__ == "__main__":
    main()
