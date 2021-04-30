FROM python:3.8-slim-buster
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
RUN apt-get update -y
RUN apt-get install -y unar libgtk2.0-dev libgl1-mesa-dev
RUN unar ./segment/your_model_name.zip
RUN mv your_model_name.h5 ./segment/segment.h5
EXPOSE 5000
CMD [ "python3", "__init__.py"]