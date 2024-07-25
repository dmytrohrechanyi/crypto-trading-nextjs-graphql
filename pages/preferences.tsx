import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const SAVE_USER_PREFERENCES = gql`
  mutation SaveUserPreferences($preferences: [String!]!) {
    saveUserPreferences(preferences: $preferences)
  }
`;

export default function Preferences() {
  const [preferences, setPreferences] = useState<string[]>([]);
  const [savePreferences] = useMutation(SAVE_USER_PREFERENCES);

  const handleSave = () => {
    savePreferences({ variables: { preferences } });
  };

  return (
    <main className="min-h-screen p-12 flex flex-col justify-center items-center">
      <h1 className="text-5xl text-center mb-12">User Preferences</h1>
      <div className="flex space-x-4">
        <input
          type="text"
          className="block w-80 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          onChange={(e) => setPreferences(e.target.value.split(','))}
          placeholder="Enter preferences separated by commas"
        />
        <button
          className="rounded w-20 bg-indigo-600 px-2 py-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </main>
  );
}
