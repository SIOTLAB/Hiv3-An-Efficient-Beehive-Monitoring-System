import time
import os
import shutil
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler


class Watcher:
    def __init__(self, directory):
        self.observer = Observer()
        self.directory = '/Users/cmerhab/Desktop/WatchdogTEST'                        #<-----CHANGE

    def run(self):
        event_handler = Handler()
        self.observer.schedule(event_handler, self.directory, recursive=True)
        self.observer.start()
        try:
            while True:
                time.sleep(20)  # sleep for 1 minute
                if not event_handler.last_event:
                    print(event_handler.last_event)
                    print("No changes made in the last minute.")
                    files = os.listdir(self.directory)
                    if len(files) > 0: #Potentially change

                        #Step 1: Remove old files from preprocess folder
                        #'/home/jursillo/MachineLearning/pre_process'
                        preprocess = '/Users/cmerhab/Desktop/NewPhoto'                  #<----CHANGE
                        fi = os.listdir(preprocess)
                        for i in fi:
                            fpath = os.path.join(preprocess, i)
                            if os.path.isfile(fpath):
                                os.remove(fpath)
                        print("Files removed from other directory")

                        time.sleep(1)

                        #Step 2: Add content from uploads to preprocess folder
                        allfiles = os.listdir(self.directory)
                        for y in allfiles:
                            src_path = os.path.join(self.directory, y)
                            dst_path = os.path.join(preprocess, y)
                            shutil.move(src_path, dst_path)
                        print("Files moved")

                        time.sleep(1)
                        
                        #Step 3: Remove Content from uploads
                        fi2 = os.listdir(self.directory)
                        for z in fi2:
                            fpath2 = os.path.join(self.directory, z)
                            if os.path.isfile(fpath2):
                                os.remove(fpath2)
                        print("Files removed from source directory")
                        
                        time.sleep(1)                      
  
                        #Step 4: Call ML Function
                        #os.system('python Beedetect.py')
			python_interpreter = '/usr/bin/python'  								#Change to the full path of python
                        scriptpath = '/Users/cmerhab/Desktop/test.py'                    					
                        os.system(f'{python_interpreter} {scriptpath} >> /tmp/ml_function.log 2>&1')                            #Changed Today
                    else:
                        print("Folder is empty")
                        print(len(files))
                else: #Delete for final implementation
                    print("Changes made in the last minute.")
                    print(event_handler.last_event)
                    event_handler.last_event = None
        except:
            self.observer.stop()
            print("Error")

        self.observer.join()

class Handler(FileSystemEventHandler):
    last_event = None

    def on_modified(self, event):
        self.last_event = event.src_path
        

if __name__ == "__main__":
    w = Watcher(".")
    w.run()
