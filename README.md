# Time News Application (Logitech)

A Node.js application without any external libraries/frameworks that scrapes latest 6 stories data from time.com homepage and returns a JSON API response as an array of above mentioned data.

## Getting Started

### Prerequisites

1. Node.js (should be installed)

### Installation and Usage

1. Clone the repository:
    ```bash
    https://github.com/rupamShaw1998/TimeLogitech.git
    ```

2. Navigate to the project directory and run:
    ```bash
    node index.js
    ```

3. Access the API endpoint:
    - Once the server is running, you can access the API endpoint at [http://localhost:5000/getTimeStories]

### Example API Response

```json
[
  {
    "title": "The Internet Stars in Abbott Elementary",
    "link": "https://time.com/6968191/abbott-elementary-tiktok-star/"
  },
  {
    "title": "Columbia University's President Rebuts Campus Bias Claims",
    "link": "https://time.com/6968289/columbia-universitys-president-rebuts-campus-hatred-bias-claims/"
  },
  {
    "title": "What Judge Merchan Knows About Trump",
    "link": "https://time.com/6968242/judge-juan-merchan-donald-trump-trial/"
  },
  {
    "title": "Senate Dismisses Mayorkas Impeachment Articles as Unconstitutional",
    "link": "https://time.com/6968262/alejandro-mayorkas-impeachment-trial-over/"
  },
  {
    "title": "An Animated Guide to the Rare 2024 Cicada Co-Emergence",
    "link": "https://time.com/6968210/cicada-brood-emergence-animation-2024/"
  },
  {
    "title": "Boeing Pushes Back on Whistleblower's Claims",
    "link": "https://time.com/6968220/boeing-whistleblowers-allegations/"
  }
]
