(function () {
    'use strict';

    const apiUrl = {
        USER: "accounts/users/",
        LOGIN: "accounts/login",
        LOGOUT: "accounts/logout/",
        // VERIFY_EMAIL: "accounts/verify-email/",
        PROFILE: "accounts/current-user/",
        DISEASE_PREDICTION: "disease/",
        DISPLAY_DISEASE: "disease/:id"
    };

    const stateNames = {
        HOME: "home",
        LOGIN: "login",
        SIGNUP: "signup",
        // SIGNUP_VERIFIED: "signup-verify",
        DETAILED_PROFILE: "profile",
        EDIT_PROFILE: "edit-profile",
        INVALID_PAGE: "invalid-page",
        DISEASE_PREDICTION: "disease-prediction",
        DISPLAY_DISEASE: "display-disease",
    };

    const stateUrls = {
        HOME: "/",
        SIGNUP: "/signup",
        LOGIN: "/login",
        DETAILED_PROFILE: "/profile",
        DISEASE_PREDICTION:"/disease-prediction",
        DISPLAY_DISEASE: "/predicted-disease",
        EDIT_PROFILE: "/edit-profile",
        INVALID_PAGE: "/*path"
    };

    const stateTemplateUrls = {
        LOGIN: "/login/views/login.view.html",
        SIGNUP: "/signup/views/signup.view.html",
        DETAILED_PROFILE: "/profile/views/profile.view.html",
        EDIT_PROFILE: "/edit-profile/views/edit-profile.view.html",
        DISEASE_PREDICTION: "/disease-prediction/views/disease-prediction.view.html",
        DISPLAY_DISEASE: "/display-disease/views/display-disease.view.html",
        INVALID_PAGE: "invalid-page/views/invalidPage.view.html",
        HOME: "/home/views/home.view.html"
    };

    const directiveTemplateUrls = {
        NAVIGATION: "/directives/navbar.view.html"
      };    

    
  const messages = {
  };

    const valid_symptoms =['skin_rash', 'continuous_sneezing', 'shivering', 'fatigue',
    'irregular_sugar_level', 'high_fever', 'breathlessness', 'sweating',
    'yellowish_skin', 'nausea', 'pain_behind_the_eyes', 'back_pain',
    'constipation', 'diarrhoea', 'mild_fever', 'malaise',
    'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose',
    'congestion', 'loss_of_smell', 'toxic_look_(typhos)', 'muscle_pain',
    'red_spots_over_body', 'belly_pain', 'watering_from_eyes',
    'increased_appetite', 'polyuria',
    'stomach_bleeding', 'blood_in_sputum']

    const symptoms = ['skin_rash', 'continuous_sneezing', 'shivering', 'fatigue', 'irregular_sugar_level', 'high_fever', 'breathlessness', 'sweating',
    'yellowish_skin', 'nausea', 'pain_behind_the_eyes', 'back_pain',
    'constipation', 'diarrhoea', 'mild_fever', 'malaise',
    'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose',
    'congestion', 'loss_of_smell', 'toxic_look_(typhos)', 'muscle_pain',
    'red_spots_over_body', 'belly_pain', 'watering_from_eyes',
    'increased_appetite', 'polyuria', 'family_history', 'coma',
    'stomach_bleeding', 'blood_in_sputum'
    ]


    const HTTPStatusCodes = {
        HTTP_BAD_REQUEST: 400,
        HTTP_SERVER_ERROR: 500,
        HTTP_UNAUTHORIZED: 401,
        HTTP_FORBIDDEN: 403,
        HTTP_404: 404,
    }

    const passwordStrengths = {
        STRONG: new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        ),
        MEDIUM: new RegExp(
            "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
        )
    };


    const diseaseDetails = {
        'Allergy': {
            discription: 'Allergies, also known as allergic diseases, are a number of conditions caused by hypersensitivity of the immune system to typically harmless substances in the environment.',
            symptoms: 'Many allergens such as dust or pollen are airborne particles. In these cases, symptoms arise in areas in contact with air, such as eyes, nose, and lungs. Aside from these ambient allergens, allergic reactions can result from foods, insect stings, and reactions to medications like aspirin and antibiotics such as penicillin.',
            treatment: 'Several medications like antihistamines, glucocorticoids, epinephrine (adrenaline), mast cell stabilizers, and antileukotriene agents are common treatments of allergic diseases. Anti-cholinergics, decongestants, and other compounds thought to impair eosinophil chemotaxis, are also commonly used.',
            imageURL: 'http://127.0.0.1:8000/media/pictures/allergy.jpg'
        },
        'Common Cold': {
            description: 'The common cold, also known simply as a cold, is a viral infectious disease of the upper respiratory tract that primarily affects the nose.[7] The throat, sinuses, and larynx may also be affected.',
            symptoms: 'The typical symptoms of a cold include cough, runny nose, sneezing, nasal congestion, and a sore throat, sometimes accompanied by muscle ache, fatigue, headache, and loss of appetite.',
            cause: 'Commonly implicated viruses include human coronaviruses (≈ 15%), influenza viruses (10–15%), adenoviruses (5%), human respiratory syncytial virus (orthopneumovirus), enteroviruses other than rhinoviruses, human parainfluenza viruses, and human metapneumovirus.',
            prevention: 'The only useful ways to reduce the spread of cold viruses are physical measures  such as using correct handwashing technique and face masks.',
            imageURL: 'http://127.0.0.1:8000/media/pictures/cold.jpg'
        },
        'Dengue': {
            description: 'Dengue fever is a mosquito-borne tropical disease caused by the dengue virus.',
            cause: 'Mosquito bite which transmit the virus.',
            symptoms: 'Symptoms typically begin three to fourteen days after infection.[2] These may include a high fever, headache, vomiting, muscle and joint pains, and a characteristic skin rash.',
            prevention: 'Prevention depends on control of and protection from the bites of the mosquito that transmits it.',
            imageURL: 'http://127.0.0.1:8000/media/pictures/dengue.jpg'
        },
        'Diabetes ': {
            description: 'Diabetes mellitus, commonly known as diabetes, is a metabolic disease that causes high blood sugar. The hormone insulin moves sugar from the blood into your cells to be stored or used for energy.',
            cause: 'With diabetes, your body either doesn’t  make enough insulin or can’t effectively use the insulin it does make.',
            symptoms: 'The general symptoms of diabetes include: increased hunger, increased thirst, weight loss, frequent urination, blurry vision, extreme fatigue, sores that don’t heal.',
            prevention: 'For medication purpose Insulin is given to patient. Apart from this patient are advised to consume less or no sugar.'
        },
        'Hepatitis C': {
            description: 'Hepatitis C is an infectious disease caused by the hepatitis C virus (HCV) that primarily affects the liver. It often leads to liver disease and occasionally cirrhosis.',
            symptoms: 'In symptoms  fever, dark urine, abdominal pain, and yellow tinged skin occurs.',
            cause: 'Caused by hepatitis C virus which spread primarily by blood-to-blood contact associated with intravenous drug use, poorly sterilized medical equipment, needlestick injuries in healthcare, and transfusions.',
            treatment: 'Treatment with antiviral medication is recommended in all people with proven chronic hepatitis C who are not at high risk of dying from other causes.',
            imageURL: 'http://127.0.0.1:8000/media/pictures/hepatitis_c.jpg'
        },
        'Hepatitis E': {
            description: 'Hepatitis E is inflammation of the liver caused by infection with the hepatitis E virus (HEV). Hepatitis E has mainly a fecal-oral transmission route.',
            cause: 'The hepatitis E virus spreads through poop. You can catch it if you drink or eat something that has been in contact with the stool of someone who has the virus.',
            symptoms: 'Symptoms may include: Mild fever, Feeling very tired, Less hunger, Feeling sick to your stomach, Throwing up, Belly pain, Dark pee, Light-colored poop, Skin rash or itching, Joint pain.',
            prevention: 'No FDA approved vaccine can prevent the hepatitis E virus. You can lower your chances of getting the virus if you: Don’t drink water or use ice that you don’t know is clean. Don’t eat undercooked pork, deer meat, or raw shellfish.',
            imageURL: 'http://127.0.0.1:8000/media/pictures/hepatitis_e.jpg'
        },
        'Malaria': {
            description: 'Malaria is a mosquito-borne infectious disease that affects humans and other animals',
            symptoms: 'Malaria causes symptoms that typically include fever, tiredness, vomiting, and headaches  In severe cases it can cause yellow skin, seizures, coma, or death.',
            cause: 'Malaria is caused by single-celled microorganisms of the Plasmodium group. The disease is most commonly spread by an infected female Anopheles mosquito.',
            prevention: 'Three medications—mefloquine, doxycycline, or the combination of atovaquone/proguanil (Malarone)—are frequently used for prevention.',
            imageURL: 'http://127.0.0.1:8000/media/pictures/malaria.jpg'
        },
        'Tuberculosis': {
            description: "Tuberculosis, abbreviated TB, is the world's most deadly infectious disease, in the sense of killing the most people on average every year.",
            cause: 'It is caused by the bacterium Mycobacterium tuberculosis (MTB) and generally affects the lungs, but can affect other parts of the body.',
            symptoms: 'General signs and symptoms include fever, chills, night sweats, loss of appetite, weight loss, and fatigue. Significant nail clubbing may also occur.',
            treatment: 'TB is a treatable and curable disease. Active, drug-susceptible TB disease is treated with a standard 6-month course of 4 antimicrobial drugs that are provided with information and support to the patient by a health worker or trained volunteer.',
            imageURL: 'http://127.0.0.1:8000/media/pictures/tb.jpg',
        },
        'Typhoid': {
            description: 'Typhoid is a bacterial infection that can lead to a high fever, diarrhea, and vomiting. It can be fatal.',
            cause: 'It is caused by the bacteria Salmonella typhi. The bacterium lives in the intestines and bloodstream of humans. It spreads between individuals by direct contact with the feces of an infected person.',
            symptoms: 'The two major symptoms of typhoid are fever and rash. Other symptoms can include weakness, abdominal pain, constipation, headaches.',
            treatment: 'The only effective treatment for typhoid is antibiotics. The most commonly used are ciprofloxacin and ceftriaxone.',
            imageURL: 'http://127.0.0.1:8000/media/pictures/typhoid.jpg'
        }
    }



    angular
        .module("app")
        .constant("BASE_URL", "http://127.0.0.1:8000/")
        .constant("apiUrl", apiUrl)
        .constant("stateUrls", stateUrls)
        .constant("stateNames", stateNames)
        .constant("stateTemplateUrls", stateTemplateUrls)
        .constant("messages", messages)
        .constant("passwordStrengths", passwordStrengths)
        .constant("HTTPStatusCodes", HTTPStatusCodes)
        .constant("directiveTemplateUrls", directiveTemplateUrls)
        .constant("symptoms", symptoms)
        .constant("diseaseDetails", diseaseDetails)
        .constant("valid_symptoms", valid_symptoms)

})();