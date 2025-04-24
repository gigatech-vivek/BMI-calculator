import re
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout
from sklearn.model_selection import train_test_split

# 1. Sample social media data (replace with your dataset)
texts = [
    "I love this product! It's amazing.",
    "Worst experience ever. Total waste of money.",
    "Had a great time using this!",
    "This is so bad... I'm disappointed.",
    "Not sure how I feel, it's okay I guess.",
]
labels = [1, 0, 1, 0, 0]  # 1: Positive, 0: Negative

# 2. Preprocessing
def clean_text(text):
    text = text.lower()
    text = re.sub(r"http\S+|www\S+|https\S+", '', text, flags=re.MULTILINE)
    text = re.sub(r"\@w+|\#", '', text)
    text = re.sub(r"[^A-Za-z0-9\s]", '', text)
    return text.strip()

texts = [clean_text(t) for t in texts]

# 3. Tokenization
vocab_size = 1000
tokenizer = Tokenizer(num_words=vocab_size, oov_token="<OOV>")
tokenizer.fit_on_texts(texts)
sequences = tokenizer.texts_to_sequences(texts)
padded = pad_sequences(sequences, padding='post', maxlen=20)

# 4. Train-test split
X_train, X_test, y_train, y_test = train_test_split(padded, np.array(labels), test_size=0.2)

# 5. Model
model = Sequential([
    Embedding(input_dim=vocab_size, output_dim=16, input_length=20),
    LSTM(64, return_sequences=False),
    Dropout(0.5),
    Dense(1, activation='sigmoid')
])

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
model.summary()

# 6. Train
model.fit(X_train, y_train, epochs=5, validation_data=(X_test, y_test))

# 7. Prediction
def predict_sentiment(text):
    cleaned = clean_text(text)
    seq = tokenizer.texts_to_sequences([cleaned])
    padded_seq = pad_sequences(seq, maxlen=20, padding='post')
    pred = model.predict(padded_seq)[0][0]
    return "Positive" if pred > 0.5 else "Negative"

# Test
print(predict_sentiment("This app is so cool!"))
