
"use client";
import React, { useState, useEffect } from "react";
import { SqTemplet, DelBtnSQ } from "@/components/ui/sqTemplet";
import { useRouter } from "next/navigation";

const Page = () => {
  const [sqTemplet, setSqTemplet] = useState<
    { id: number; parentIdx: number; questionText: string;image?: string }[]
  >([]);
  const [sqTempletName, setSqTempletName] = useState<string>("sq-1");
  const router = useRouter();

  const generateId = () => Date.now() + Math.random();

  const [userId, setUserId] = useState<string | null>(null);
  const [primaryInfoId, setPrimaryInfoId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        setErrorMsg("User not logged in! Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const idFromUrl = params.get("primaryId");
      if (idFromUrl) {
        setPrimaryInfoId(idFromUrl);
      } else {
        setErrorMsg("Missing primaryId in URL!");
      }
    }
  }, [router]);

  const handleAddCQGroup = () => {
    const newSQ = {
      parentIdx: sqTemplet.length,
      id: generateId(),
      questionText: "",
      image: "", 
    };
    setSqTemplet((prev) => [...prev, newSQ]);
  };

  const handleDeleteGroup = (idx: number) => {
    setSqTemplet((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleQuestionTextChange = (idx: number, value: string) => {
    setSqTemplet((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, questionText: value } : item))
    );
  };
  const handleImageChange = (idx: number, image: string) => {
  setSqTemplet((prev) =>
    prev.map((item, i) => (i === idx ? { ...item, image: image } : item))
  );
};


  const handleSubmit = async () => {
    if (!userId || !primaryInfoId) {
      alert("User or Primary Info ID missing!");
      return;
    }

    const body = {
      user: userId,
      primaryInfo: primaryInfoId,
      sqGroup: {
        title: sqTempletName,
        questions: sqTemplet.map((q) => ({
           questionText: q.questionText || "",  
           image: q.image || "",
 })),
        
      },
    };

    try {
      const res = await fetch("/Api/sq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      if (result.success) {
        alert("Short Question saved successfully!");
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  const renderSQComponent = (item: any, arrayIndex: number) => {
    return (
      <SqTemplet
        key={item.id}
        value={item.questionText}
        image={item.image}
        onChange={(val) => handleQuestionTextChange(arrayIndex, val)}
          onImageChange={(url) => handleImageChange(arrayIndex, url)}

      >
        <DelBtnSQ pIdx={arrayIndex} onDelete={() => handleDeleteGroup(arrayIndex)} />
      </SqTemplet>
    );
  };

  return (
    <div id="test" className="my-15 w-full">
      <div className="fixed top-[100px] z-10 w-full flex justify-center">
        <div className="flex justify-between items-center max-w-2xl w-full bg-gray-400 p-2 rounded-2xl">
          <span className="font-semibold">Add a new Short Question</span>
          <button
            className="px-6 py-1 bg-black text-white rounded-xl hover:bg-blue-700"
            onClick={handleAddCQGroup}
          >
            Add
          </button>
        </div>
      </div>

      <div className="mt-[50px] space-y-4">{sqTemplet.map(renderSQComponent)}</div>

      <div className="mt-8 flex justify-center">
        <button
          className="px-3 py-1 bg-black text-white rounded-md hover:bg-blue-700 font-semibold"
          onClick={handleSubmit}
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default Page;
