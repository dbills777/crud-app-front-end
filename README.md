-  ## Check out the Live site here ->  [View App](https://bills-crud-app-frontend.netlify.app/characters)
-
- # How I worked on this project:
- ## This was a school project that focused on buidling a Full Stack Crud application.
- I built this app based on Figma designs: [Screenshot of designs]
- I worked with tasks on a Kanban board: [Screenshot of tasks]
- I used feature branches and Pull Requests: [Link to example PR]
## How to navigate this project
- Somewhat complex stateful logic: [Link to example code on GitHub]
- Responsive CSS using styled-components: [Link to example code on GitHub]
- The application fetches data from the XZY API: Examples for the request [link to code on
GitHub] and data transformation [link to code on GitHub]
- Integration tests using React Testing Library: [Link to example test on GitHub]
## Why I built the project this way
- I didn't use a state management library like Redux on purpose. For this app simple `useState` is
sufficient. I realized that more and more projects don't use Redux anymore since GraphQL or
react-query are often used for data management.
- styled-components is a great library for styling. It includes an auto-prefixer, uses scoped
classes, and allows a seamless integration with JS.
- My plan is to become a full-stack developer eventually. But for the beginning I focus on the
frontend. That's why I decided to use an existing API rather to create a custom server. I have
basic backend knowledge as well.
- Testing is an essential part of production applications. Testing Library is the go-to library in the
React community. I covered the essential features of the app with tests.
## If I had more time I would change this
- Set up continuous integration to run the tests and ESLint on every Pull Request
- Refactor some of the code. Especially this part [link to code on GitHub]
- Add end-to-end tests with Cypress.
## Available Scripts
[List scripts to start or test the app here]

# The project requirements are listed below.

## 1. Effectively use conditional logic and JavaScript array methods(e.g. Filter, Map, Reduce, Find) to render large lists.

- [Quotes.js](/src/Components/Quote.js) map/conditional logic

```javascript
return quotes.map((item) => {
  const author = item.author;

  const image = items.characters.filter((person) => {
    return person.name === author || person.nickname === author;
  });
  const photo = image.map((person) => person.img);

  return (
    <div className='quoteDiv' key={item.quote_id} style={style}>
      <button className='btn' onClick={getNewQuote}>
        New quote
      </button>
      <br></br>
      <div className='bubble' style={style}>
        <em className='italics'>
          <h3>
            <strong></strong> "{item.quote}"
          </h3>
        </em>
      </div>

      <p className='flex'>
        {image.length ? (
          <>
            <Slide direction='left' in={checked} mountOnEnter unmountOnExit>
              <img alt={photo.id} className='img' src={photo}></img>
            </Slide>
          </>
        ) : null}
        -{item.author}, {item.series}
      </p>
    </div>
  );
});
```

- [Episodes.js](/src/Components/Episodes.js) Large List display

```javascript
<TableBody>
  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
    return (
      <TableRow hover role='checkbox' tabIndex={-1} key={row.episode_id}>
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {column.text}
              {column.format && typeof value === 'number' ? column.format(value) : value}
            </TableCell>
          );
        })}
      </TableRow>
    );
  })}
</TableBody>
```

## 2. Encapsulate your code as React functional components.

- Components encapsulated as functional Components, Including CSS files if Component has CSS outside of React functional component.

## 3. Work with command-line tools and NPM to create and manage your project within a real development toolset.

- NPM
- VS Code
- Git
- Zsh

## 4. Allow communication between components using props and the Context API.

- [EpisodeContext.js](/src/contexts/EpisodeContext.js) -> Props Communication between components.

```javascript
export const EpisodeContextProvider = (props) => {
  const [episodes, setEpisodes] = useState([]);
  const url = 'https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad';

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const response = await axios.get(url);
        setEpisodes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCharacters();
  }, []);
  return <EpisodeContext.Provider value={{ episodes }}>{props.children}</EpisodeContext.Provider>;
};
```

- Context API used to handle custom login.

```javascript
export const useEpisodeContext = () => useContext(EpisodeContext);
const LoginContext = createContext({
  isAuth: false,
  email: '',
  name: '',
  login: () => {},
  setName: () => {},
  setEmail: () => {},
});
```

- [LoginContext.js](/src/contexts/LonginContext.js) Context API used to handle custom login.
  ```javascript
  const LoginContext = createContext({
    isAuth: false,
    email: '',
    name: '',
    login: () => {},
    setName: () => {},
    setEmail: () => {},
  });
  ```

## 5. Present a form for user input that provides useful form validation and feedback.

- [LoginFullScreen.js](/src/Components/LoginFullScreen.js) Context API used to handle custom

```javascript
<Formik
initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              submit: null,
            }}
validationSchema={Yup.object().shape({
email: Yup.string()
.email('Must be a Valid Email address')
.max(30)
.required('Email is Required'),
firstName: Yup.string()
.min(3, 'First Name Must be 3 characters or more')
.max(40, 'Name is too long')
.required('First Name is Required'),
lastName: Yup.string()
.min(3, 'Last Name Must be 3 characters or more')
.max(40, 'Name is too long')
.required('Last Name is Required'),
})}
```

## 6. Create at least 5 custom components and use it within at least two of your other components.

- [Card.js](/src/contexts/CharacterContext.js) Character Cards
- [Carduser.js](/src/contexts/EpisodeContext.js) User Card when logging in with Auth0
- [Episode.js](/src/contexts/LoginContext.js) Episode Table
- [MenuAppBar.js](/src/contexts/LoginContext.js) Menu/Nav Bar
- [PersonalCard.js](/src/contexts/LoginContext.js) Personal display card upon login
- [LoginFullScreen.js](/src/contexts/LoginContext.js) Login Form Context
- [Quotes.js](/src/contexts/LoginContext.js) Quotes display

## 7. Use a mix of CSS animations and Transition Component transitions to enhance some aspects of your project.

- Quotes display image slide in.
- Login Lock animation.
- Hamburger Menu open animation/blur

## 8. Connect to a server using HTTP and display retrieved data.

- Connected to Breaking Bad API

## 9. Provide at least 3 different routes with navigation between them using React Router.

```javascript
<Route path='/quotes' component={Quotes} />
<Route path='/episodes' component={Episodes} />
<Route path='/characters' component={CardUser} />
<Route path='/login' component={LoginFullScreen} />
<Route path='/' component={LoginFullScreen} />
```

## 10. Manage your application's state using Hooks and the Context API.

- [CharacterContext.js](/src/contexts/CharacterContext.js) Character Context
- [EpisodeContext.js](/src/contexts/EpisodeContext.js) Episode Table Context
- [LoginContext.js](/src/contexts/LoginContext.js) Login Form Context

## 11. Structure, document, and deploy your final project code according to common industry practices.
