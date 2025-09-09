import React, {useState, useEffect} from 'react'

const Postboardingbutton = () => {
  const [showBanner1, setShowBanner1] = useState(true);
  const [showBanner2, setShowBanner2] = useState(true);



  return (
    <div className='text-black flex flex-col py-3 gap-3 '>
        {showBanner1 && (
        <div className='bg-yellow-200 text-gray-800 mt-10'>
                        <button
              className="absolute top-14 right-2 text-gray-500"
              onClick={() => setShowBanner1(false)}
            >
                ✖
              
            </button>
            <h3 className='font-bold underline'>Important</h3>
            <p>කරුණාකර හැකි තාක් තොරතුරු 
            සම්පූර්ණ කරන්න. 
            මින් බෝඩින්කාරුවන්ට වහා තීරණ ගැනීමට උපකාරී වන නිසා, 
            ඔබගේ බෝඩිම ඉක්මනින් කුලියට දෙනු හැක.</p>
            <p className='text-sm py-2'>தயவுசெய்து அதிகமாக 
                இயன்ற அளவு தகவல்களை நிரப்புங்கள். 
                இது வாடகையாளர்கள் விரைவில் முடிவு 
                எடுக்க உதவும், எனவே உங்கள் விடுதி 
                சீக்கிரம் வாடகைக்கு விடப்படும்.</p>
        </div>)}

        {showBanner2 && (
                <div className='bg-green-300/80 text-sm p-1 text-gray-500 '>
            <h3 className='font-bold'>Live and Let Live</h3>
            <p>Sri Lanka has over 2,500 new oral cancer cases every year. The biggest reason is poor diet and too much street/fast food. Street food often has reused oil and unsafe chemicals. For your tenants’ health, please allow a small rice cooker so they can cook healthy meals</p>
            <button 
            className='absolute top-50 right-2'
            onClick={() => setShowBanner2(false)}>
                ✖
                </button>

            
        </div>
        )}


    </div>
  )
}

export default Postboardingbutton