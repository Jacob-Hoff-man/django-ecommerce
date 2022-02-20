# django-ecommerce full-stack project
A simple ecommerce website that utilizes React/Django.

### Run Instructions:

- Install [Python on your machine](https://www.python.org/downloads/).
- Create a virtual environment, which will be used to install the required dependencies for the project.
- Activate the virtual environment.
- Open the root directory `django-ecommerce` for the project in the terminal/command prompt.
- From inside the root directory, traverse to the nested `django-ecommerce` directory:
 
    - `cd django-ecommerce`
    
- From inside of the nested `django-ecommerce` directory (and with the virtual environment active in the terminal/command prompt), install the required dependencies:

    - `pip install -r requirements.txt`
    
- After installing the required dependencies, run the following command (with the virtual environment active) inside of the nested `django-ecommerce` directory to launch the server:

    - `python manage.py runserver`
    
- The website is now active on `localhost:8000`, open a web browser and traverse to this address to access the project.
- The admin dashboard may be accessed through `localhost:8000/admin`. There is an existing admin account with the credentials `Username: jake@email.com Password: jakesPass`, but a new admin account may be created using the following command:


    - `python manage.py createsuperuser`



### Problem Description:

A prototype full-stack project required to be developed was commissioned as a coding challenge. A basic e-commerce flow website was selected as the prototype. The project needed to allow for basic inventory management in the backend for product data entry, product list browsing on the frontend, adding to a cart, and a subsequent checkout process. Additionally, a basic virtual event booth required implementation, which had to receive content from the backend to display on the frontend, as well as a raffle ticket form submission for sending user-inpputed data to the backend. Naturally, splitting the full-stack project's architecture into a frontend, backend, and database was necessary. 

### Solution Description:

The project focused on developing a full-stack web application using React/Django/SQLite as the frontend/backend/database. The frontend/backend were developed in
seperate directories to keep the codebase as organized as possible. A REST API was developed in the backend to serve data to/from the frontend and database. The product data entry is handled via the django admin dashboard, but the backend does accomodate for dynamically inserting products. Additionally, the backend was designed to provide a list of all products, or a specific product, to the frontend for presenting to an end-user via the main website page (all products list) and the product page (a specific product). The cart process was handled mainly on the frontend, but maintains persistent data through the end-user's web browser local storage. The cart can be appended to from any product page (assuming the product has available stock), and a cart page was implemented to display the current state of the cart. To handle the checkout process, users/authentication were implemented into the project. This added additional tasks to the project, such as expanding the backend to accomodate for login/logout/registration, and the implementation of a user profile page. The checkout process consisted of a series of pages (shipping information, payment information, and checkout review/submission) and ultimately required the implementation of the order (checkout information) being sent to the database. This process requires authentication of a logged in user. Furthermore, the project allowed for the orders of a specific user to be sent to the frontend to be displayed, which is presented on a user's profile page when logged in. The virtual event booth, similar to the products, has it's data entry handled via the django admin dashboard, but the backend accomodates for dynamically inserting new events. The events page displays a specific event, and within the page is a form for submitting a simple raffle ticket (collects some general user information) to the database from the frontend. Finally, the backend serves the list of raffle tickets that
pertain to a specific event, and these are listed on that event's page.

#### Frontend:
The frontend utilizes various packages for it's design:
- `npx create-react-app` - command used to generate boiler plate code for the frontend React application. 
- react-bootstrap - component-based library that provides Bootstrap components in the form of React components. This is used extensively in the UI design due to the ease-of-use of the component library and styling options. Additionally, a bootstrap theme was selected from www.bootswatch.com.
- font awesome - the font awesome stylesheet was included in the index.html header to provide a library of icons used in the UI design.
- react-router-dom - used to implement dynamic routing in the web application, and "reactify" the routing such that the webpage does not have to fully reload anytime a new page is presented.
- react-router-bootstrap - used for integration between react-router and react-bootstrap.
- axios - used to create HTTP request in the frontend for acquiring external data (the data in the backend), which simplifies the process of intercepting responses/requests.
- redux - used for application-level/global-level state, which is used in this project for managing/centralizing a global state in the frontend for manipulation of relevant data in an organized manner.
- react-redux - used for utilization of redux in react.
- redux-thunk - this is middleware for redux that allows action creators to return a function instead of a direct action.
- redux-devtools-extensions - allows utilization of the redux devtools in google chrome for inspecting the redux global state (debugging purposes).

The frontend react files were turned into static assets, and then merged into the django server for optimization and security purposes.


#### Backend:
The backend utilizes various packages for it's design: 
- django - used as the web framework for the backend.
- `django-admin startproject` - command used to generate boiler plate code for the backend django application. Subsequently, `python manage.py startapp ecommerce` was run to create the main app for the web application's backend.
- djangorestframework - used to build the REST API in the backend in a more simplified, flexible manner. 
- django-cors-headers - adds cross-origin resource sharing headers to responses, which basically allows addresses to access the API based on the header.
- Pillow - used for handling images in the backend database/models.
- djangorestframework-simplejwt - due to the use of djangorestframework, this plugin was used to provide JSON web token authentication for the user authentication in the project.


A list of the backend development code that was NOT generated boiler plate code:
- Some additions to the settings.py for configuration, these were annotated with comments.
- Some additions to the root urls.py file, mainly to assemble parent url paths.
- All files in `ROOT/django-ecommerce/ecommerce/urls`.
- All files in `ROOT/django-ecommerce/ecommerce/views`.
- The `ROOT/django-ecommerce/ecommerce/serializers.py` file.
- The `ROOT/django-ecommerce/ecommerce/models.py` file.
- The `ROOT/django-ecommerce/ecommerce/signals.py` file.


### Trade-offs and Future Development

- There is some development-in-progress for the implementation of reviews/comments, but it is not completed. This includes some static values inserted into a product entry,
such as rating and number of reviews, and there is an unused model schema in the backend for Reviews. The project does not have the ability for users to submit reviews at this time.
This functionality was excluded in the interest of time.

- Payment processing still needs to be implemented, but there is a page view designed in the frontend flow for this feature. The functionality was detailed as not required for this code challenge, so in the interest of time, it was skipped. 

- A customer admin view that allows for the input of products/events from the frontend was never implemented, but would be an essential requirement for future expansion of this project. Currently, the django admin dashboard is the only method for product/events entry, and considering the effictiveness of this in the scope of the project, developing the admin view was postponed for future development.

- SQLite was used as a database due to it's inherent simplicity, as well as being pre-packaged with the boiler plate django server that was generated. A production-level project would rather use a database, such as PostgreSQL, that avoids SQLite's issues with concurrency and scalability. Moving forward, the current database should be swapped for one that is more suited to production.

- The list of events in the nav dropdown (referencing the header menu) are statically encoded into the nav dropdown. It would be preferred to have a dynamically growing nav dropdown list to display all active events in the database, but there were issues during development with making this work, and should be revisited in the future.  
