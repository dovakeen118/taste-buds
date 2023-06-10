import React, { useState } from "react";

export const SignOutButton = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const signOut = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/v1/user-sessions", {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const responseBody = await response.json();
      setShouldRedirect(true);
      return { status: "ok" };
    } catch (err) {
      console.error(`Error in fetch for Sign Out: ${err.message}`);
    }
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <button type="button" className="button" onClick={signOut}>
      Sign Out
    </button>
  );
};
