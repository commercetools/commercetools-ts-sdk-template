import * as React from 'react';

import toast, { Toaster } from 'react-hot-toast';

import { request } from '../sdk/request';
import { Credentials } from '../sdk/root';

import './style.css';

const initCredentials = {
  projectKey: getItem('projectKey'),
  clientID: getItem('clientID'),
  clientSecret: getItem('clientSecret'),
  scopes: getItem('scopes'),
};

function getItem(key: string): string {
  const _credentials = JSON.parse(localStorage.getItem('credentials'));
  return (_credentials && _credentials[key]) || '';
}

function validate({ projectKey, clientID, clientSecret }): boolean {
  const isEmpty = projectKey && clientID && clientSecret;

  return isEmpty;
}

export default function App(): React.JSX.Element {
  const [data, setData] = React.useState<any>(null);
  const [credentials, setCredentials] =
    React.useState<Credentials>(initCredentials);
  const [toggleField, setToggleField] = React.useState('password');
  const [rotateChevron, setRotateChevron] = React.useState(true);

  React.useEffect(() => {
    request(credentials).then(setData);
  }, []);

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

  async function saveToLocalStorage(): Promise<void> {
    if (validate(credentials)) {
      localStorage.setItem('credentials', JSON.stringify(credentials));
      toast.success('Credentials saved to local storage!');

      return;
    }

    toast.error('Something went wrong!');
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
                Save details to local storage
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
      <div className="res-wrapper">
        {data && (
          <div>
            <pre className="result">{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>

      <Toaster />
    </div>
  );
}
