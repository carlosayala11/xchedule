import gmaps
api_key = "AIzaSyCeHf-jcEx21QPuV7BZOUOukikZ-bQYxDA"
gmaps.configure(api_key=api_key)
new_york_coordinates = (30.2690717, 77.9910673)
gmaps.figure(center=new_york_coordinates, zoom_level=17)