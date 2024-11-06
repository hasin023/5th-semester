import warnings
warnings.filterwarnings("ignore", category=UserWarning, message="SymbolDatabase.GetPrototype() is deprecated")

import pickle
import cv2
import mediapipe as mp
import numpy as np
import tkinter as tk
import threading
import time
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

# Load the model
model_dict = pickle.load(open('./pre-model.p', 'rb')) # Load the pre-trained model
# model_dict = pickle.load(open('./model.p', 'rb')) # Load the model trained from scratch
model = model_dict['model']

# Initialize the video capture
cap = cv2.VideoCapture(0)

# Mediapipe Hands
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

hands = mp_hands.Hands(static_image_mode=False, min_detection_confidence=0.7, max_num_hands=1)

# Labels dictionary
labels_dict = {
    0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f'
}

# Create a tkinter window
root = tk.Tk()
root.title("ASL Prediction")

# Create a text field in tkinter
text_field = tk.Text(root, height=2, width=40, font=("Helvetica", 16))
text_field.pack()

# Create a clear text button
def clear_text():
    text_field.delete('1.0', tk.END)  # Clear the text field
    logging.info('Text cleared.')

clear_button = tk.Button(root, text="Clear Text", command=clear_text)
clear_button.pack()

# Variable to store the previous prediction and time
prev_prediction = None
word_count = 0  # Track how many words have been written

# Variables to track the detected character and delay counter
last_detected_character = None
fixed_character = ""
delayCounter = 0
start_time = time.time()

# Function to update the tkinter text field by appending the new predicted character
def update_text_field(text):
    if text == 'space':
        text_field.insert(tk.END, ' ')  # Append a space
    else:
        text_field.insert(tk.END, text + '')  # Append new character
    logging.info(f'Word added: {text if text != "space" else "space (represented as space)"}')

# Function to run video capture and ASL prediction in a separate thread
def run():
    global last_detected_character, fixed_character, delayCounter, start_time

    while True:
        data_aux = []
        x_ = []
        y_ = []

        ret, frame = cap.read()

        frame = cv2.flip(frame , 1)
        
        if not ret:
            break

        H, W, _ = frame.shape
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(frame_rgb)

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(
                    frame,
                    hand_landmarks,
                    mp_hands.HAND_CONNECTIONS,
                    mp_drawing_styles.get_default_hand_landmarks_style(),
                    mp_drawing_styles.get_default_hand_connections_style()
                )

            for hand_landmarks in results.multi_hand_landmarks:
                for i in range(len(hand_landmarks.landmark)):
                    x = hand_landmarks.landmark[i].x
                    y = hand_landmarks.landmark[i].y

                    x_.append(x)
                    y_.append(y)

                for i in range(len(hand_landmarks.landmark)):
                    x = hand_landmarks.landmark[i].x
                    y = hand_landmarks.landmark[i].y
                    data_aux.append(x - min(x_))
                    data_aux.append(y - min(y_))

                x1 = int(min(x_) * W) - 10
                y1 = int(min(y_) * H) - 10
                x2 = int(max(x_) * W) - 10
                y2 = int(max(y_) * H) - 10

                # Make prediction using the model
                prediction = model.predict([np.asarray(data_aux)])
                predicted_character = labels_dict[int(prediction[0])]

                # Draw a rectangle and the predicted character on the frame
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 0), 4)
                cv2.putText(frame, predicted_character, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 0, 0), 3,
                            cv2.LINE_AA)

                current_time = time.time()

                # Timer logic: Check if the predicted character is the same for more than 1 second
                if predicted_character == last_detected_character:
                    if (current_time - start_time) >= 1.0:  # Class fixed after 1 second
                        fixed_character = predicted_character
                        if delayCounter == 0:  # Add character once after it stabilizes for 1 second
                            update_text_field(fixed_character)
                            delayCounter = 1
                else:
                    # Reset the timer when a new character is detected
                    start_time = current_time
                    last_detected_character = predicted_character
                    delayCounter = 0  # Reset delay counter for a new character

        # Show the video feed with the prediction
        cv2.imshow('frame', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

# Function to exit the application and stop both Tkinter and OpenCV
def exit_app():
    global cap
    logging.info('Exiting application...')
    if cap.isOpened():
        cap.release()  # Release the video capture
    cv2.destroyAllWindows()  # Close OpenCV windows
    root.quit()  # Stop the Tkinter main loop
    root.destroy()  # Close the Tkinter window

# Create an "Exit" button
exit_button = tk.Button(root, text="Exit", command=exit_app)
exit_button.pack()

# Start the video capture in a separate thread to keep tkinter responsive
threading.Thread(target=run, daemon=True).start()

# Start the tkinter main loop
root.mainloop()