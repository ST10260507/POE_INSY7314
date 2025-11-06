INSY7314 POE FINAL README - Secure Customer International Payments Portal (Customer and Employee)

INTRODUCTION:
The Secure Customer International Payments Portal is the final integrated solution for the international bank's internal development project. It comprises two main components: the public-facing Customer Portal (for initiating secure transfers) and the internal Employee Portal (for reviewing and approving those transfers). The core mandate is the enforcement of rigourous security standards, including those hashing and salting, RegEx input whitelisting, and mandatory SSL communication, and the implementation of a robust DevSecOps pipeline to ensure code qualtiy and security assurance across the entire application lifecycle.  


CONTENTS:

     - REQUIREMENTS + PREREQUISITES.........1
     - GETTING STARTED......................2
     - USAGE................................3
     - KEY FEATURES.........................4
     - NON-FUNCTIONAL REQUIREMENTS..........5
     - ARCHITECTURE.........................6
     - FAQs.................................7
     - CREDITS..............................8
     - GITHUB LINK..........................9
     - YOUTUBE LINK.........................10
	 - SONARQUBE LINK.......................11
     - TEST ADMIN USER LOGIN DETAILS........12
     - REFERENCES...........................13


1. REQUIREMENTS + PREREQUISITES 

     REQS (Technologies to be installed)
     
     - Node.js and npm
     - React Development Environment
     - Git (for version control)
     - Backend Runtime
     - MongoDB Compass or Atlas CLI 
     - OBS Studio or a similar screen recording tool
     - Circle CI CLI
     - SonarCloud/SonarQube Integration
   

     PREREQUISITES (External Setup)
     
   1. SSL Certificate Setup
      - A valid SSL certificate must be configured for both the API and the development environment to ensure all traffic is served over HTTPS, meeting the security mandate
   2. MongoDB Setup:
      - A MongoDB database instance (local or Atlas) must be running.
      - A database and collections (e.g., customers, transactions) must be prepared to securely store customer credentials (hashed and salted) and initial transaction records.
   3. Backend API Configuration:
      - The API must be configured with a MongoDB Connection String.
      - It must use a secure hashing algorithm (e.g., bcrypt) for password storage.
      - Secure secret keys (e.g., for JWT generation) must be defined as environment variables.
    4. DevSecOps Pipeline Setup:
       - The Github repository must be linked to CircleCI and configured to run the security and quality checks upon code pushes, with results reported to SonarQube.

3. GETTING STARTED:
   
    Step-by-Step Setup:
      1. Clone the Repository:

        Bash
        	git clone https://github.com/ST10260507/POE_INSY7314.git
        	cd POE_INSY7314

      2. Set Up the Backend API:
         - Navigate to the API folder (e.g., src/api).
         - Run dependency installation: [Your API Dependency Command, e.g., npm install].
         - Update the MongoDB Connection String and configure HTTPS/SSL settings in the API configuration files.
         - Run the server: [Your API Run Command].

      3. Set Up the Customer Portal (React Frontend):
         - Navigate to the client folder (e.g., src/client/customer-portal).
         - Install dependencies: npm install.
         - Update the API base URL in the environment configuration to point to your secure (HTTPS) API endpoint.
      4. Set up the EMployee Portal (React Frontend):
         - Navigate to the employee folder
         - Install dependencies: npm install
         - Update the API base URL to point to your secure (HTTPS) API endpoint.
      5. Database Initialisation (MongoDB):
    	- Ensure the MongoDB instance is running and accessible via the connection string defined in the API.
      6. Build and Run:
    	- In the React directory, run: npm start.
    	- The secure Customer Portal should open in your browser, accessing the backend via HTTPS.


4. USAGE:

    USER:
    	- Registration: Navigate to the Register screen. Input full name, ID number, account number, and choose a strong password. The system uses RegEx to validate all fields before the API saves the hashed data to MongoDB.
    	- Login: Input the registered full name, ID number, account number, and password in the fields on the Login screen to gain authenticated access. The API verifies the credentials against the hashed data in MongoDB.
    	- Payment Initiation: Once logged in, enter the amount and select the currency. Provide the payee's account details and the required SWIFT code.
    	- Final Submission: Click "Submit" to securely submit the validated transaction request to the API, where it is stored as a new document in the MongoDB transactions collection.

    ADMIN:
    
          - Login: Login to the app using the already set up login details. This can be found in the ' 11. TEST ADMIN USER LOGIN DETAILS'
          - Transactions: The admin can view transactions and approve or reject them

      
6. KEY FEATURES:

    	- Secure Customer Registration: Collects sensitive data and securely stores credentials using Hashing and Salting in MongoDB.
    	- Robust Password Security: Hashing and Salting are enforced on the backend to protect customer credentials stored in the NoSQL database.
    	- Strict Input Validation: Utilizes RegEx patterns to validate every input field on the API, ensuring data integrity and mitigating threats before saving to MongoDB.
    	- SWIFT-Ready Submission: The system collects all required international payment details.
    	- NoSQL Transaction Persistence: Successfully initiated payments are stored immediately as secure documents in a MongoDB collection, awaiting employee verification.

7. NON-FUNCTIONAL REQUIREMENTS:

    	- Security (Primary): Meets the mandatory requirements for SSL/TLS (HTTPS), Hashing and Salting, RegEx Input Whitelisting, and general protection against known web attacks (e.g., XSS, NoSQL Injection, authentication bypass).
    	- Maintainability: Built with modular components (React for frontend, RESTful API for backend) and uses a flexible NoSQL structure (MongoDB) for easy updates and maintenance.
    	- Performance: Optimized API endpoints and efficient MongoDB queries ensure quick registration, login, and transaction submission times.
    	- Usability (UX): A clear, intuitive interface that guides the customer through the secure registration and payment initiation process.
    
8. ARCHITECTURE:

       The Customer Portal utilizes a secure three-tier architecture:
      	- Frontend: The Customer Portal is a single-page application built with React.js. It handles user input and communicates exclusively with the backend API via HTTPS.
      	- Backend/API: A RESTful API built with Node.js.
	    - Role: Enforces RegEx validation, performs password hashing/salting, handles business logic, and manages secure communication with the database.
	    - Database: MongoDB is used to store all persistent data. Customer credentials (hashed) and transaction documents are stored securely in dedicated collections.
	    - Security Layer (Protocol): SSL/TLS secures the communication channel between the React client and the API.
   
9. FAQs:

   Q: Where is the customer's payment information stored?

	    A: All sensitive data, including transaction details, is stored as a secure document in a MongoDB collection upon clicking "Submit," accessible only to the pre-registered bank staff via the internal portal .

   Q: How is my password protected?

	    A: Your password is never stored in plain text. It is secured on the backend using an industry-standard combination of hashing and salting before being saved to MongoDB, as mandated by the security requirements.

   Q: How do you protect against attacks?

	    A: Protection is multi-layered: HTTPS encrypts traffic; RegEx validation prevents malicious input; and security practices like secure handling of MongoDB queries and proper use of hashing are implemented to prevent injection and authentication vulnerabilities.


10. CREDITS:

This group project was completed as part of the INSY7314 Module.

     - Joshua De Wet – ST10313014
     - Ankriya Padayachee – ST10260507
     - Cade Gamble – ST10262209
     - Kyle Govender – ST10145498
     - Dinaley Mc Murray – ST10249944


9. GITHUB LINK:
    
        Repository: https://github.com/ST10260507/POE_INSY7314.git

10. YOUTUBE LINK:

        https://youtu.be/Cd9Ov8AvtGQ

11. SONARQUBE LINK:

		https://sonarcloud.io/dashboard?id=ST10260507_POE_INSY7314&organization=Ankriya

12. TEST ADMIN USER LOGIN DETAILS:

        Full Name:  bod
        National ID number: 9907065202081
        Account Number: 1298312938
        Password: JoshIsCool1

13. REFERENCES
    
        - Cloudflare (2024). What is an SSL Certificate? | How to Get a Free SSL Certificate | Cloudflare. Cloudflare. [online] Available at: https://www.cloudflare.com/learning/ssl/what-is-an-ssl-certificate/ [Accessed 10 Oct. 2025].
        - GeeksforGeeks (2024). Rate Limiting Algorithms System Design. [online] GeeksforGeeks. Available at: https://www.geeksforgeeks.org/system-design/rate-limiting-algorithms-system-design/ [Accessed 10 Oct. 2025].
        - MDN (2024). Content Security Policy (CSP) implementation - Security on the web | MDN. [online] MDN Web Docs. Available at: https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/CSP [Accessed 10 Oct. 2025].
        - Microsoft (2023). Implement role-based access control in applications - Microsoft identity platform. [online] learn.microsoft.com. Available at: https://learn.microsoft.com/en-us/entra/identity-platform/howto-implement-rbac-for-apps.
        - OpenAI (2025). ChatGPT. [online] ChatGPT. Available at: https://chatgpt.com/ [Accessed 10 Oct. 2025].
        - redhat (2022). What is a CI/CD pipeline? [online] www.redhat.com. Available at: https://www.redhat.com/en/topics/devops/what-cicd-pipeline [Accessed 10 Oct. 2025].
        - Yarom Talmi (2023). What is a Helmet Content Security Policy, and Do You Need It? [online] CybeReady. Available at: https://cybeready.com/helmet-content-security-policy/ [Accessed 10 Oct. 2025].
