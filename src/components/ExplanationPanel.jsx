// function ExplanationPanel({ diagnostics }) {
//   return (
//     <section className="panel">
//       <h2>Code Diagnostics</h2>

//       {diagnostics.length === 0 ? (
//         <p>✅ No errors found.</p>
//       ) : (
//         diagnostics.map((item, index) => (
//           <div key={index} style={{ marginBottom: "1rem" }}>
//             <strong>
//               {item.severity.toUpperCase()}
//             </strong>

//             <p>
//               Line {item.line}
//             </p>

//             <p>
//               {item.message}
//             </p>
//           </div>
//         ))
//       )}
//     </section>
//   );
// }

// export default ExplanationPanel;