WEATHER FORECAST WIDGET

    Displays the current weather and a 3 day forecast for Calgary, AB. 
    Has a button to toggle the temperature between Celsius and Fahrenheit.
    Responsive to various screen sizes.

A3. Refactor weather forecast widget

    Selected Programming Language for Refactor: Typescript

    Enhancement suggestions        
        Improve client-side error handling and UX
          +  Loading placeholder cards
          +  Placeholder animation
          +  Delayed fetch response 

        Improve Widget's User Experience
          +  Animated Background - Weather condition based
          +  Dark and Light modes
          +  Use additional API data - Hourly temperatures, Wind, Feels like, etc.
          +  Menu with settings
                Toggling API data displayed
                    minimalist pre-set
                    Customization options
                Accessibility options
                    High Contrast
                    Screen Reader
          +  Geo-location
                determine user's location for API request
          +  save multiple locations
          +  Round to nearest whole number
        
        Improve code organization
          +  Separate into modules
          +  Use prettier extension
            

    AI usage
        Breakdown of refactoring.
        Steps to refactor JavaScript to typescript.
        Understanding transition errors
            Issues with modules - Debug: removed and kept everything in 1 file
            Undefined data types - Debug: created interfaces and error handling functions
        



        
    


-------------------------------------------------
-------------------------------------------------
-------------------------------------------------


A2. Develop a weather forecast widget

REQUIREMENTS
    3 day || 7 day forecast
    Toggle between Celsius and Fahrenheit
    Review weather API documentation 
    Identify limitations based on free tier model
    Determine Technical dependencies
    Define test plans

    Initialize code repo
        initialize node
        set up dependencies (tailwindcss, icon library)
        set up scripts
        push to github

    Design UI Components
        Elements to display each day
        Toggle button to switch between Celsius and Fahrenheit
        Responsive design across multiple devices and screen sizes

    Functionality
        function to handle logic for displaying the weather forecast
        function to to toggle between Celsius and Fahrenheit
        Event listeners to detect interaction with temperature unit toggle button
        Weather API fetches and UI population

    Icons and Dynamic Rendering
        Conditional statements to render icons

    Appropriate CSS Styles
    Thorough testing and debugging
    Refine codebase for readability, organization, and compliance with HTML/CSS standards.
    Document project
    Attributions

    --------------------------------------------------DOCUMENTATION
    Day 1. 
        Assignment breakdown
        Start setting up repo
            Github
            Node
        
    Day 2.
        Signed up for Weather API
        Created weather.js
        Started trying to fetch information from API
        Created base HTML file with placeholder information

    Day 3.
        Created styles.css
        Started designing UI components
    
    Day 4.
        Researched CORS policy error
            Debugged - had capitalized location in URL
        Created async functions to fetch and log current and forecasted weather from API
        Customized json data in API website to simplify data being fetched
        Built function for creating forecast day card and appending to container
        Created async function to render the forecast cards
        Errors accessing information 
            undefined - debugging - I believe I'm not accessing the arrays correctly
        Created function to create and render the weather widget information from fetched data
            accessing arrays correctly
        Debugging forecast rendering
            issue is in the current weather rendering process - commenting out section of js lets forecast render
    
    Day 5.
        Weather API email. Free tier on October 28th. Free tier only gives 3 day forecast. Switching widget to that.

        Debugging Rendering: 
        Reduced fetching to one function, returning an array of the data needed.
        switched how the current weather was created from innerHTML to appendChild. (no effect).
        Reduced rendering to one function but had innerHTML null error. Scope issue, moved getElementById to inside the forEach loop to fix problem.

        Building formatting function to populate widget with month and day
            Can't set a new date, not understanding it correctly. Switching gears for now

        Developing temperature toggle button

    Day 6.
        Gave in and used AI to help me solve my scope issues with my toggle button, how to implement the icons, and to format the dates from weatherAPI.
        
        Creating AI reflection documentation.

    Day 7.
        Fixed formatDate
        Finished AI reflection documentation
        Fixed error messaging
        Finished Styling
        Created Responsive design

            
    


        






    







