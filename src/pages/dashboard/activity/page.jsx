import React from 'react';

const Activity = () => {

  return (
    <div>Activity</div>
  )
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <iframe
          src="https://9000-firebase-fractus-ui-1750908709332.cluster-zkm2jrwbnbd4awuedc2alqxrpk.cloudworkstations.dev/dashboard"
          title="Embedded Activity"
          className="w-full h-[600px] border-none"
        />
      </div>
    </div>
  );
};

export default Activity;
