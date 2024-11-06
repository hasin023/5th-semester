import os
import pickle
import mediapipe as mp
import cv2

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.7)

DATA_DIR = './data'
data = []
labels = []

for dir_ in os.listdir(DATA_DIR):
    for img_path in os.listdir(os.path.join(DATA_DIR, dir_)):
        data_aux = []
        img = cv2.imread(os.path.join(DATA_DIR, dir_, img_path))
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        results = hands.process(img_rgb)
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                for i in range(21):  # There are 21 landmarks in a hand
                    x = hand_landmarks.landmark[i].x
                    y = hand_landmarks.landmark[i].y
                    data_aux.append(x)
                    data_aux.append(y)
            
            # Ensure all data points have the same length (42 for 21 landmarks with x and y)
            if len(data_aux) == 42:
                data.append(data_aux)
                labels.append(dir_)
        else:
            print(f"No hand detected in {os.path.join(DATA_DIR, dir_, img_path)}")

f = open('data.pickle', 'wb')
pickle.dump({'data': data, 'labels': labels}, f)
f.close()

print(f"Processed {len(data)} images successfully.")
print(f"Skipped {sum(len(os.listdir(os.path.join(DATA_DIR, dir_))) for dir_ in os.listdir(DATA_DIR)) - len(data)} images due to no hand detection.")