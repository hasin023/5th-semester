import warnings
warnings.filterwarnings("ignore", category=UserWarning, message="SymbolDatabase.GetPrototype() is deprecated")

import pickle
import cv2
import mediapipe as mp
import numpy as np
import tkinter as tk
from tkinter import ttk
import threading
import time
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

# Load the model
model_dict = pickle.load(open('./model.p', 'rb'))
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

class ResponsiveGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("ASL Prediction")
        self.root.geometry("600x400")

        self.setup_ui()
        self.setup_variables()

    def setup_ui(self):
        self.root.grid_rowconfigure(0, weight=1)
        self.root.grid_columnconfigure(0, weight=1)

        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        main_frame.grid_rowconfigure(0, weight=1)
        main_frame.grid_columnconfigure(0, weight=1)

        self.text_field = tk.Text(main_frame, wrap=tk.WORD, font=("Helvetica", 16), height=10)
        self.text_field.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))

        scrollbar = ttk.Scrollbar(main_frame, orient="vertical", command=self.text_field.yview)
        scrollbar.grid(row=0, column=1, sticky=(tk.N, tk.S))
        self.text_field.configure(yscrollcommand=scrollbar.set)

        button_frame = ttk.Frame(main_frame)
        button_frame.grid(row=1, column=0, columnspan=2, pady=10)

        clear_button = ttk.Button(button_frame, text="Clear Text", command=self.clear_text)
        clear_button.pack(side=tk.LEFT, padx=5)

        new_line_button = ttk.Button(button_frame, text="New Line", command=self.new_line)
        new_line_button.pack(side=tk.LEFT, padx=5)

        exit_button = ttk.Button(button_frame, text="Exit", command=self.exit_app)
        exit_button.pack(side=tk.LEFT, padx=5)

    def setup_variables(self):
        self.prev_prediction = None
        self.word_count = 0
        self.last_detected_character = None
        self.fixed_character = ""
        self.delayCounter = 0
        self.start_time = time.time()

    def clear_text(self):
        self.text_field.delete('1.0', tk.END)
        logging.info('Text cleared.')

    def new_line(self, event=None):
        self.text_field.insert(tk.END, '\n')
        self.text_field.see(tk.END)
        logging.info('New line created.')
        return 'break'

    def update_text_field(self, text):
        if text == 'space':
            self.text_field.insert(tk.END, ' ')
        else:
            self.text_field.insert(tk.END, text + '')
        self.text_field.see(tk.END)
        logging.info(f'Word added: {text if text != "space" else "space (represented as space)"}')

    def run_asl_detection(self):
        while True:
            data_aux = []
            x_ = []
            y_ = []

            ret, frame = cap.read()

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

                    prediction = model.predict([np.asarray(data_aux)])
                    predicted_character = labels_dict[int(prediction[0])]

                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 0), 4)
                    cv2.putText(frame, predicted_character, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 0, 0), 3,
                                cv2.LINE_AA)

                    current_time = time.time()

                    if predicted_character == self.last_detected_character:
                        if (current_time - self.start_time) >= 1.0:
                            self.fixed_character = predicted_character
                            if self.delayCounter == 0:
                                self.root.after(0, self.update_text_field, self.fixed_character)
                                self.delayCounter = 1
                    else:
                        self.start_time = current_time
                        self.last_detected_character = predicted_character
                        self.delayCounter = 0

            cv2.imshow('frame', frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()

    def exit_app(self):
        logging.info('Exiting application...')
        if cap.isOpened():
            cap.release()
        cv2.destroyAllWindows()
        self.root.quit()
        self.root.destroy()

def main():
    root = tk.Tk()
    app = ResponsiveGUI(root)
    threading.Thread(target=app.run_asl_detection, daemon=True).start()
    root.mainloop()

if __name__ == "__main__":
    main()