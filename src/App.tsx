// Home.tsx
// import React, { useEffect } from 'react';

// export default function Home() {
//   const hack = () => {};
//   useEffect(hack, [])

//   return (
//     <section>
//       <h1>This is the home page</h1>
//       <p>Lorem Ipsum is simply dummy text of the printing
//         and typesetting industry. Lorem Ipsum has been the
//         industry's standard dummy text ever since the 1500s,
//         when an unknown printer took a galley of type and
//         scrambled it to make a type specimen book.
//         It has survived not only five centuries, but also the leap into
//         electronic typesetting, remaining essentially unchanged.
//         It was popularised in the 1960s with the release of Letraset
//         sheets containing Lorem Ipsum passages, and more recently with
//         desktop publishing software like Aldus PageMaker
//         including versions of Lorem Ipsum.</p>
//     </section>
//   )
// }


import React, { useEffect } from 'react';
import toast from 'react-simple-toasts';

import { request } from './sdk/request';
import { Credentials } from './sdk/root';

import './style.css';
import 'react-simple-toasts/dist/theme/dark.css';
import 'react-simple-toasts/dist/theme/failure.css';

const initCredentials = {
  projectKey: '',
  clientID: '',
  clientSecret: '',
  scopes: ''
};

export default function App() {
  const [data, setData] = React.useState<any>(null);
  const [credentials, setCredentials] =
    React.useState<Credentials>(initCredentials);
  const [toggleField, setToggleField] = React.useState('password');
  const [rotateChevron, setRotateChevron] = React.useState(true);

  function getItem(key: string) {
    const _credentials = JSON.parse(localStorage.getItem('credentials') as string);
    // set state here
    setCredentials(state => ({
      ...state,
      [key]: (_credentials && _credentials[key]) || ''
    }));
  }

  function validate({ projectKey, clientID, clientSecret }: any): boolean {
    const isEmpty = projectKey && clientID && clientSecret;

    return isEmpty;
  }

  useEffect(function () {
    if (!localStorage) return;
    Object.keys(initCredentials).map(getItem)
  }, [])

  // triggers
  async function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    const { name, value } = event.target;

    setCredentials(
      (prevState) =>
      ({
        ...prevState,
        [name]: value,
      } as Pick<Credentials, keyof Credentials>)
    );
  }

  async function executeRequest(
    event: React.SyntheticEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    const data = await request(credentials);
    setData(data);
  }

  function saveToLocalStorage() {
    if (validate(credentials)) {
      localStorage.setItem('credentials', JSON.stringify(credentials));
      toast('Credentials saved to local storage!', { theme: 'dark', position: 'top-center' });

      return;
    }

    toast('Something went wrong!', { theme: 'failure', position: 'top-center' });
  }

  function removeFromLocalStorage() {
    localStorage.removeItem('credentials');
    toast('Credentials deleted from local storgage!', { theme: 'dark', position: 'top-center' });
  }

  function toggleFields(): void {
    if (toggleField == 'text') {
      setToggleField('password');
    } else {
      setToggleField('text');
    }
  }

  function toggleAccordion(): void {
    setRotateChevron(!rotateChevron);
  }

  // derived state
  const rotate = rotateChevron ? 'rotate(-180deg)' : 'rotate(0)';
  const { projectKey, clientID, clientSecret, scopes } = credentials;

  return (
    <div className="container">
      <div className="title-text">Welcome to the Typescript SDK Sandbox</div>

      <div className="subtitle-text">
        Edit sdk/request.ts and click "Execute request" to view the response.
      </div>

      <div className="disclaimer">
        <ul>
          <li>This service is not hosted by commercetools.</li>
          <li>Do not store API Client credentials in the files.</li>
          <li>The sandbox is intended as a playground and not an actual environment.</li>
          <li>API Client credentials entered in the below form are only used in the current session.</li>
        </ul>
      </div>


      <div className="form-title">
        <div className="form-instruction-text">
          Enter your API Client credentials:
        </div>
        <button
          type="button"
          onClick={toggleAccordion}
          className="image-border"
          style={{ transform: rotate, transition: 'all 0.2s linear' }}
        >
          <img
            // src="https://cdn-icons-png.flaticon.com/512/1665/1665586.png"
            src="https://cdn-icons-png.flaticon.com/512/2985/2985150.png"
            width="30px"
            height="30px"
          />
        </button>
      </div>

      <div className={`form-container${!rotateChevron ? '__hide' : ''}`}>
        <form onSubmit={executeRequest}>
          <div className="form-field">
            <div className="label">Project Key</div>
            <div className="input-wrapper">
              <input
                required
                autoComplete="off"
                type={toggleField}
                placeholder="Enter API client `projectKey`"
                name="projectKey"
                value={projectKey}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          <div className="form-field">
            <div className="label">Client Id</div>
            <div className="input-wrapper">
              <input
                required
                autoComplete="off"
                type={toggleField}
                placeholder="Enter API client `clientID`"
                name="clientID"
                value={clientID}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          <div className="form-field">
            <div className="label">Client Secret</div>
            <div className="input-wrapper">
              <input
                required
                autoComplete="off"
                type={toggleField}
                placeholder="Enter API client `clientSecret`"
                name="clientSecret"
                value={clientSecret}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          <div className="form-field">
            <div className="label">Scopes</div>
            <div className="input-wrapper">
              <input
                type={toggleField}
                placeholder="Enter API client `scopes`"
                name="scopes"
                value={scopes}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          <div className="trigger-wrapper">
            <div className="action-switcher-btn">
              <button
                type="button"
                className="save-details-button"
                onClick={saveToLocalStorage}
              >
                Save credentials to local storage
              </button>

              <button
                type="button"
                className="save-details-button"
                onClick={removeFromLocalStorage}
              >
                Delete credentials from local storage
              </button>

              <button
                type="button"
                className="toggle-visibility"
                onClick={toggleFields}
              >
                <img
                  src={
                    toggleField == 'password'
                      ? 'https://cdn-icons-png.flaticon.com/512/4298/4298895.png'
                      : 'https://cdn-icons-png.flaticon.com/512/2356/2356734.png'
                  }
                  width="20px"
                  height="20px"
                />
              </button>
            </div>
            <button type="submit" className="execute-trigger-btn">
              Execute request
            </button>
          </div>
        </form>
      </div>

      <div className="response-header-text">
        <span>Response</span>
      </div>
      {data && (
        <div className="res-wrapper">
          <div>
            <pre className="result">{JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
