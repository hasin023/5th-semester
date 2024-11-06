# ASL Detection Model

This is the ML Model trained for the ASL Detection. We are using MediaPipe Hand Tracking to detect the hands and then using the landmarks to train the model. The model is trained using Random Forest Classifier from the sklearn library.

## Prerequisites

- Python 3.10.8
- Numpy
- Matplotlib
- OpenCV
- MediaPipe
- Scikit-learn
- Pickle
- tkinter
- Flask

Firstly, check your current python version by running the following command in the terminal:

```bash
python --version # for Python2

python3 --version # for Python3
```

If you don't have python installed, I suggest using `PyEnv` to download and install the version `3.10.8`. You can install `PyEnv` from [here](https://github.com/pyenv/pyenv).

## Virtual Environment

It is recommended to create a virtual environment to install the required libraries. To create a virtual environment, run the following command in the terminal:

```bash
python -m venv .venv
```

To activate the virtual environment, run the following command:

```bash
source .venv/bin/activate # for Linux

.venv\Scripts\activate # for Windows
```

To deactivate the virtual environment, run the following command:

```bash
deactivate
```

## Installation

To install the required libraries, run the following command:

```bash
pip install -r requirements.txt
```

If you install any new library, you can update the `requirements.txt` file by running the following command:

```bash
pip freeze > requirements.txt
```

Once the required libraries are installed, you can run the model using the following command in the terminal for the Right Hand:

```bash
python 4-1_Real-time-deployment-RIGHT.py
```

For the Left Hand, run the following command:

```bash
python 4-2_Real-time-deployment-LEFT.py
```

By default, the model is trained for the Right Hand. And it is set to use the Pre-trained model `pre-model.p`. The new model which will be trained by us from scratch will be saved as `model.p`. We can change the model we want to use in lines `17-18` in the `4-1_Real-time-deployment-RIGHT.py` and `4-2_Real-time-deployment-LEFT.py` files.

## Training
