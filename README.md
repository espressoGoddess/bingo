# [Bingo 🎯](https://bingo.espressogoddess.dev)

## Abstract
A multiplayer bingo game. Users can join games, track tasks, and mark completion. Admin management currently handled via Supabase GUI.

### Features ✨
- Join existing games via shareable secret code
- Interactive bingo card grid
- User authentication with OAuth
- Game progress saved to backend db
- Responsive Tailwind UI
- Normalized database architecture
- Print Preview feature that allows users to generate arbitrary number of unique boards

### Technologies & Tooling used:
- TypeScript
- Next.js
- Supabase
- Next-Auth
- Tailwind CSS

### Preview
<div>
  <img src="./assets/gameBoard.png" alt="Screenshot of Bingo Gameboard" style="height:600px; width:auto; border:1px solid #eee; margin:1rem 0;" />
  <img src="./assets/singleTask.png" alt="Screenshot of Single Task Details" style="height:600px; width:auto; border:1px solid #eee; margin:1rem 0;" />
</div>

### 🧩 Database Architecture
<div>
  <img src="./assets/DB.png" alt="Database Schema Visualization" style="height:600px; width:auto; border:1px solid #eee; margin:1rem 0;" />
  <p><em>Normalized database schema showing table relationships</em></p>
</div>

### Challenges
- Automatic caching masked real-time DB changes.
- Designing a normalized DB schema for the first time.

### Learning Goals
- Gain understanding of static typing
- Practice normalization principles at scale
- Create printer-friendly views with Tailwind

### Future Roadmap
- 🛠️ Built-in admin dashboard for custom game creation
- 📊 Game statistics tracking
- ⚡ Real-time player updates
- 📸 Photo uploading
