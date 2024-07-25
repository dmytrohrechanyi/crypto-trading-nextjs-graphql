import { useState } from 'react';
import Link from 'next/link';
import { gql, useMutation, useQuery } from '@apollo/client';

const GET_USER_PREFERENCES = gql`
  query GetUserPreferences {
    userPreferences {
      cryptocurrencies
      tradingPairs
    }
  }
`;

const SAVE_USER_PREFERENCES = gql`
  mutation SaveUserPreferences($input: SaveUserPreferenceInput!) {
    saveUserPreferences(input: $input) {
      cryptocurrencies
      tradingPairs
    }
  }
`;

export default function Preferences() {
  const [preferences, setPreferences] = useState<string[]>([]);
  const [savePreferences] = useMutation(SAVE_USER_PREFERENCES);

  const { data, loading, error, refetch } = useQuery(GET_USER_PREFERENCES);

  const handleSave = async () => {
    try {
      await savePreferences({
        variables: { input: { userPreferences: preferences } },
      });
      setPreferences([]);
      refetch();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <main className="min-h-screen p-12 flex flex-col justify-center items-center space-y-8">
      <Link href="/cryptocurrencies">Go to Cryptocurrencies</Link>
      <Link href="/trading-pairs">Go to Trading Pairs</Link>
      <h1 className="text-5xl text-center">User Preferences</h1>
      <div className="flex space-x-4">
        <input
          type="text"
          className="block w-96 rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          value={preferences.join(',')}
          onChange={(e) => setPreferences(e.target.value.split(','))}
          placeholder="Enter preferences separated by commas"
        />
        <button
          className="rounded w-20 bg-indigo-600 px-2 py-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleSave}
          disabled={preferences.length === 0}
        >
          Save
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Fetching failed.</p>}
      {data && (
        <div className="flex space-x-12">
          <ul className="gap-4">
            <h2 className="text-xl mb-2">
              {data.userPreferences.cryptocurrencies.length === 0 && 'No '}
              Saved Cryptocurrencies
            </h2>
            <ul className="flex flex-col items-center">
              {data.userPreferences.cryptocurrencies.map(
                (cryptocurrency: string, i: number) => (
                  <li key={cryptocurrency + i}>{cryptocurrency}</li>
                )
              )}
            </ul>
          </ul>
          <ul className="gap-4">
            <h2 className="text-xl mb-2">
              {data.userPreferences.tradingPairs.length === 0 && 'No '}
              Saved Trading Pairs
            </h2>
            <ul className="flex flex-col items-center">
              {data.userPreferences.tradingPairs.map(
                (cryptocurrency: string, i: number) => (
                  <li key={cryptocurrency + i}>{cryptocurrency}</li>
                )
              )}
            </ul>
          </ul>
        </div>
      )}
    </main>
  );
}
