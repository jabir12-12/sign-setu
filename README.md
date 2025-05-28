## Use Case Flow

- **Start**
  
  - ➤ **View Portfolio**
    - Navigate to the **Portfolio Page**
      - View KPIs for overall stock performance  
      - View user's invested stocks  
      - View stocks by category  
        - View stock table for detailed information on each stock  

  - ➤ **Click on User Profile**
    - Navigate to the **User Details Page**  

  - ➤ **Click the Refresh Button**
    - Fetch the latest stock updates from Yahoo Finance  

  - ➤ **Search for Words**
    - Enter keyword into the **Search Bar**  
    - Filter results based on the word or its definition  

  - ➤ **Add New Word**
    - Click on the **Add Words** button  
    - Fill out form: word, definition, image URL, video URL  
    - Submit to add word to the dictionary  
    - Display toast message for success or failure  

  - ➤ **Edit Existing Word**
    - Click on the **3-dot menu** on a word card  
    - Click **Edit**  
    - Pre-fill modal with existing word data  
    - Update form fields and submit  
    - Display toast message for success or failure  

  - ➤ **Delete Word**
    - Click on the **3-dot menu** on a word card  
    - Click **Delete**  
    - Confirm and remove word from the dictionary  
    - Display toast message for success or failure  


https://github.com/user-attachments/assets/b6f99932-77e6-41dc-8547-9b6072b93135

## Tech Stack

- **Frontend**:  
  - [Next.js](https://nextjs.org/) – React framework for server-side rendering and routing  

- **Backend**:  
  - [Node.js](https://nodejs.org/) – JavaScript runtime for backend APIs  

- **Database**:  
  - [MongoDB](https://www.mongodb.com/) – NoSQL database for storing word and user data  


## Libraries Used

- **UI & UX**:
  - `toast` – For success and error notifications  
  - `dialog` – For modal dialogs used in Add/Edit/Delete actions  
  - `lucide` – Icon library used across the UI  

