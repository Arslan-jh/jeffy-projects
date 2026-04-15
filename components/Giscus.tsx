"use client";

import Giscus from "@giscus/react";

export default function GiscusComponent() {
  return (
    <div className="mt-16 pt-8 border-t border-black/10">
      <Giscus
        id="comments"
        repo="Arslan-jh/jeffy-projects"
        repoId="R_kgDOOB1V5A"
        category="General"
        categoryId="DIC_kwDOOB1V5M4CZ9p5"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="light"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
