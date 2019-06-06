### DJANGO + REACT ###
1. pip3 install pipenv
2. pipenv shell 
3. pipenv install django djangorestframework django-rest-knox
4. django-admin startproject notes_manager
    cd notes_manager
5. command+shift+p --> install Python Select Interpreter
6. Generate a django app for "notes"
    python manage.py startapp notes
7. Navigate into the notes_manager directory (within the larger notes_manager directory) and open `settings.py`. Add the new "app" (called "notes") as well as the "rest_framework" under the INSTALLED_APPS list
8. This is the time and place to setup Postgresql/MySQL if I should want to (information about doing so is in the django documentation)

# Database Setup #
10. cd notes
    open `models.py` and add the following
    class Note(models.Model):
        title       = models.CharField(max_length=140)
        body        = models.CharField(max_length=1000)
        created_at  = models.DateTimeField(auto_now_add=True)
11. Create, and run, a migration to place that table (& columns) in the database:
    python manage.py makemigrations notes
    python manage.py migrate

# API Setup #
12. Create a serializer to convert my new model into JSON. This will turn my Note model into a NoteSerializer
    cd notes
    touch `serializers.py`

    from rest_framework import serializers
    from notes.models import Note

    # Note Serializer
    class NoteSerializer(serializers.ModelSerializer):
        class Meta:
            model = Note
            fields = "__all__"
13. touch `api.py` (still within notes directory)
    Here, I will create my Viewset. This is like RoR scaffolding resources, which allows me to create a CRUD API without having to specify explicit methods. I don't have to create explicit routes, just register my endpoints (/api/notes) from which to make HTTP requests.

    from notes.models import Note
    from rest_framework import viewsets, permissions
    from .serializers import NoteSerializer

    # Note Viewset
    class NoteViewSet(viewsets.ModelViewSet):
        queryset = Note.objects.all()
        permission_classes = [
            permissions.AllowAny
        ]
        serializer_class = NoteSerializer
14. cd notes_manager
    open `urls.py` 

    from django.contrib import admin
    from django.urls import path, include

    urlpatterns = [
        path('', include("notes.urls")),
    ]
15. cd notes
    touch `urls.py`

    from rest_framework import routers
    from .api import NoteViewSet

    router = routers.DefaultRouter()
    router.register("api/notes", NoteViewSet, "notes")

    urlpatterns = router.urls
16. python manage.py runserver
17. Use POSTMAN to send a GET request to http://localhost:8000/api/notes (this should return an empty list)
18. Make a POST request to http://localhost:8000/api/notes with the Header's Key set to "Content-Type" and the Value set to "application/json". In the Body, create a JSON object and fill it with the fields from my DB model:
    {
	    "title": "ANOTHER TEST?",
	    "body": "And when you die, and are buried deep, in the shadows you shall sleep with mind abroad and eyes you'll cree, beneath the dirt while mourners weep."
    }   

# React Setup #
19. This will be a manual installation. I am integrating react into django. I will create a frontend "app" (a django concept) and, within that, create and utilize the `index.html` file (which will function as a template and serve as the entry-point for react), an `index.js` file (the entrypoint for my JS which will point to a `main.js` app component which will contain the transpiled JS to be loaded into the browser).
    open a new terminal and run `$ pipenv shell`
    cd notes_manager 
    ls     (if `manage.py` is in thie folder, it is the root folder and thus the correct one from which I can create a new django app)
    python manage.py startapp frontend
20. mkdir -p ./frontend/src/components
    - This will contain all of my react components
21. mkdir -p ./frontend/{static,templates}/frontend
    - Templates will handle the `index.html` file to be loaded (the single page of thie SPA)
    - Static will contain the compiled JS file, `main.js`
        - Webpack will take `index.js` react app and compile that down to the `main.js` file within Static 
22. cd ..
    ls    (should see Pipfile)
    npm init
23. npm install webpack webpack-cli --save-dev
24. npm install @babel/core babel-loader @babel/preset-env @babel/preset-react babel-plugin-transform-class-properties --save-dev
25. npm install react react-dom prop-types --save
26. In the root directory, above the package.json, create `.babelrc`
    {
        "presets": ["@babel/preset-env", "@babel/preset-react"],
        "plugins": ["transform-class-properties"]
    }
27. In the same directory as `.babelrc`, create the webpack file: `webpack.config.js`. This file will allow me to use Babel to transpile my code
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
            ]
        }
    }
28. Add the following scripts to the package.json file
    "scripts": {
        "dev": "webpack --mode development --watch ./notes_manager/frontend/src/index.js --output ./notes_manager/frontend/static/frontend/frontend/main.js",

        "build": "webpack --mode production ./notes_manager/frontend/src/index.js --output ./notes_manager/frontend/static/frontend/frontend/main.js"
    },
29. cd notes_manager/src
    touch `index.js`

    import App from "./components/App";
30. cd components
    touch `App.js`

    import React from "react";
    import ReactDOM from "react-dom";

    class App extends React.Component {
        render(){
            return(
                <h1>
                    REACT ME
                </h1>
            )
        }
    }

    ReactDOM.render(
        <App />,
        document.getElementById("app")
    );
31. cd templates/frontend
    touch `index.html`
32. Add an HTML boilerplate and ensure that the <body> contains the following: 
    <body>
        <div id="app"></div>
        {% load static %}
        <script src="{% static "frontend/main.js" %}"></script>
    </body>
33. Add the frontend app to the notes_manager/settings.py file
34. Add a frontend method to the file frontend/views.py
    def index(request):
        return(
            render(request, "frontend/index.html")
        )
35. Link a URL to the frontend/views.py file
    touch frontend/urls.py

    from django.urls import path
    from . import views
    urlpatterns = [
        path("", views.index)
    ]
36. Include the frontend urls into the main notes_manager/urls.py 
    from django.contrib import admin
    from django.urls import path, include

    urlpatterns = [
        path("", include("frontend.urls")),
        path("", include("notes.urls"))
    ]
37. npm run dev
    - React app should be up and running!
38. mkdir src/components/layout
    touch Header.js

    import React from "react";
    class Header extends React.Component {
        render(){
            return(
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand" href="#">Notes Manager</a>
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        {/* <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                        </li> */}
                        </ul>
                        {/* <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>  */}
                    
                    </div>
                </nav>
            )
        }
    }
    export default Header;
39. mkdir src/components/notes
40. touch src/components/notes/Dashboard.js src/components/notes/Form.js src/components/notes/Notes.js
41. Notes = class component, Form = class component, Dashboard = functional component which will receive Notes and Form into itself. Dashboard will need React, {Fragment} since it will encapsulate Form and Notes into a Fragment which it will then export into the main App.js file (which will also utilize {Fragment} to encapsulate the Header and Dashboard components)

# REDUX #
Redux will provide application-level state and serve as a "single source of truth" 
42. Stop webpack from running (not the server, but the terminal running npm run dev)
43. npm install redux react-redux redux-thunk redux-devtools-extension --save
44. npm run dev
45. Create the Redux data Store (`touch src/store.js`)
    import {createStore, applyMiddleware} from "redux";
    import {composeWithDevTools} from "redux-devtools-extension";
    import thunk from "redux-thunk";
    import rootReducer from "./reducers";

    const initialState = {};
    const middleware = [thunk];
    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
    );

    export default store;
46. mkdir src/reducers
47. touch src/reducers/index.js
    - This is the file containing the "root reducer", which is a collection point for all other reducers (notesReducers, authReducer, errorsReducer)
    ......LOTS HAS HAPPENED
....
50. npm install axios --save
    .....HOW TO IMPLEMENT "UPDATE"?
51. npm install react-alert react-alert-template-basic react-transition-group --save
.....
52. npm install react-router-dom --save