from ultralytics import YOLO 
import numpy as np
import supervision as sv
import cv2
import time

#method of capturing the frames

frames = []

model = YOLO("train111/weights/best.pt")
#model = YOLO("DownloadedDatasetBeeDetection.pt")

box_annotator = sv.BoxAnnotator(
        thickness=2,
        text_thickness=2,
        text_scale=1
    )

frame_width = 0
frame_height = 0

# Initialize tracker
tracker = sv.ByteTrack()

# Define start and end points for the line zone

# 358 x 169

width = 1100
height = 550
_x = 300
_y = 50
start_point = sv.Point(x=_x, y=_y)
end_point = sv.Point(x=_x, y=_y+height)
line_zone_1 = sv.LineZone(start=start_point, end=end_point)

start_point = sv.Point(x=_x, y=_y)
end_point = sv.Point(x=_x+width, y=_y)
line_zone_2 = sv.LineZone(start=start_point, end=end_point)

start_point = sv.Point(x=_x+width, y=_y)
end_point = sv.Point(x=_x+width, y=_y+height)
line_zone_3 = sv.LineZone(start=end_point, end=start_point)

start_point = sv.Point(x=_x, y=_y+height)
end_point = sv.Point(x=_x+width, y=_y+height)
line_zone_4 = sv.LineZone(start=start_point, end=end_point)

box_annotator = sv.BoxAnnotator(
    thickness=1,
    text_thickness=1,
    text_scale=0.5,
)
line_annotator = sv.LineZoneAnnotator(thickness=2, text_thickness=2, text_scale=0.5)

import os
print("file exists?", os.path.exists('SVGA-trim.mp4'))

cap = cv2.VideoCapture('SVGA-trim.mp4')
bees_in = 0
bees_out = 0

while cap.isOpened():
    ret, frame = cap.read()

    if not ret:
        print("Can't receive frame (stream end?). Exiting ...")
        break
    
    #time.sleep(10)

    # Process frame with YOLO model
    result = model.predict(frame, imgsz=640, conf=0.35, iou = 0.25)
    #print(result)

    # Convert YOLO detections to Supervision format
    detections = sv.Detections.from_ultralytics(result[0])

    # Update tracker with detections
    detections = tracker.update_with_detections(detections)

    # Trigger line zone to detect crossing
    crossed_in_1, crossed_out_1 = line_zone_1.trigger(detections)
    crossed_in_2, crossed_out_2 = line_zone_2.trigger(detections)
    crossed_in_3, crossed_out_3 = line_zone_3.trigger(detections)
    crossed_in_4, crossed_out_4 = line_zone_4.trigger(detections)

    frame = box_annotator.annotate(
            scene=frame,
            detections=detections
        )

    frame = line_annotator.annotate(frame, line_zone_1)
    frame = line_annotator.annotate(frame, line_zone_2)
    frame = line_annotator.annotate(frame, line_zone_3)
    frame = line_annotator.annotate(frame, line_zone_4)

    cv2.imshow("frames", frame)
    cv2.waitKey(5)
    #time.sleep(10)

    bees_in = line_zone_1.in_count + line_zone_2.in_count + line_zone_3.in_count + line_zone_4.in_count
    bees_out = line_zone_1.out_count + line_zone_2.out_count + line_zone_3.out_count + line_zone_4.out_count

    print("In: " + str(bees_in))
    print("Out: " + str(bees_out))

