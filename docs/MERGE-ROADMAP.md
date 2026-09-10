# AYURDISHA merge section — staff roadmap

End-to-end guide for how questions are grouped, answered, and shown back to students on **Track my answer**.

---

## 1. Ask Desk — student consent

When a student submits a question they choose:

| Field | Values | Effect |
|-------|--------|--------|
| **Anonymous publication consent** | Yes / No | **Yes** → question may enter the merge pool. **No** → individual-only path; never clustered. |
| **Follow-up consent** | Yes / No | Used for in-person mentor selection; does not affect merge. |

Only submissions with `consentPublish = Yes` are considered for automatic or manual merging.

---

## 2. Curation desk — merge logic

**Location:** Staff tab → **Curation desk**

### 2.1 Automatic merge (“Merge questions”)

1. Filter to merge-opted submissions only (`consentPublish = Yes`).
2. **Group by theme + sub-area** (subtheme). “Keep sub-areas separate” is on by default — questions in different subthemes within the same theme are never merged.
3. **Tokenise** each question (+ optional context): lowercase, strip punctuation/diacritics, remove stop words, light stemming (`-ing`, `-ed`, `-s`, `-tion`, `-ment`).
4. **Weighted similarity** (replaces plain Jaccard):
   - Token Jaccard + **bigram overlap** + **rare-term weighting** (terms appearing in ≤2 questions in the theme group count 1.5×).
   - Combined score: 55% weighted Jaccard, 35% plain Jaccard, 10% bigram Jaccard.
5. **Pass 1 — strict auto-merge:** each question joins the best bucket only if similarity ≥ **threshold** (default **0.42**, slider 0.15–0.70). No match → singleton.
6. **Pass 2 — packing:** buckets under 6 members may combine if cross-bucket similarity ≥ `max(0.28, threshold × 0.78)`.
7. **Singletons:** questions with no similar neighbour stay as their own group (`kind: unique`) — mentors still answer them; they are not forced into wrong groups.
8. **Composite wording:** defaults to the **longest member question**; staff edit on Curation desk for hall phrasing.
9. **Re-merge** preserves existing `composite`, `answer`, and cluster IDs when the same representative question is still in a group.

### 2.2 Manual controls

| Action | How |
|--------|-----|
| **Merge groups** | Tick ≥2 group checkboxes → **Merge selected groups**. Member lists combine; longest representative wording is kept. |
| **Split one student out** | Open a group → **Split out** next to their wording. They become a new singleton cluster. |
| **Edit composite** | Write the hall question mentors will answer (shown on Track and Answer board). |
| **Assign mentor / status** | Track workflow: New → Composed → Sent to mentor → Answered → Published. |
| **Publish** | **Publish to students** makes the merged answer visible on the public Answer board (requires answer text). Excel import auto-sets status to Published. |

### 2.3 Threshold tuning (staff)

| Slider | Effect |
|--------|--------|
| **Lower (e.g. 0.25)** | Fewer, broader groups — more questions lumped together. |
| **Higher (e.g. 0.55)** | More, tighter groups — only very similar wording merges. |
| **Uncheck “Keep sub-areas separate”** | Merge across subthemes within a theme (use with care). |

---

## 3. Mentor pack — merged groups only

**Location:** Staff tab → **Mentor pack**

The mentor pack handles **merge-opted students only** (merged and unique singleton groups). Students who opted **No** at the Ask Desk are **not** in the mentor pack — answer them from **Insights → Briefing board → Provide answer**.

### 3.1 Download merged Excel (`MENTOR_BRIEF`)

**One row per student** in each cluster. Cluster-level columns repeat on every member row.

| Column | Purpose |
|--------|---------|
| `Cluster_ID` | Stable group id — do not edit |
| `Theme`, `Subtheme` | Classification |
| `Students_In_Cluster` | Group size |
| `Composite_Question` | Hall question mentors answer |
| `Representative_Wording` | Longest raw student wording |
| `Ticket_ID` | Student ticket |
| `Question_ID` | Internal id |
| `WAC_Reg_No` | WAC registration number |
| `Name`, `Email` | For mentor reference (staff export only) |
| `Original_Question` | That student's exact wording |
| `MERGED_ANSWER` | **Fill** — hall answer for the whole group |
| `INDIVIDUAL_ANSWER` | **Optional** — personal note for this ticket only (merge-opted students) |
| `ACTION_1`–`ACTION_3` | Next steps (merged answer) |
| `COMMON_MISTAKE` | One pitfall |
| `RESOURCE_1`, `RESOURCE_2` | Official links/refs |
| `MENTOR_NAME_DESIGNATION` | Sign-off |
| `Assigned_Mentor` | Pre-filled from curation desk |

A second sheet **HOW_TO_FILL** explains the columns.

### 3.2 Upload filled merged answer sheet

**Same section** as download — **Upload filled merged answer sheet** button.

- Matches rows by `Cluster_ID`.
- Reads `MERGED_ANSWER` (or legacy `ANSWER`) → saved on cluster → visible to **all merge-opted members** on Track.
- Reads optional `INDIVIDUAL_ANSWER` per `Ticket_ID` → saved as `individualAnswer` on that submission.
- Sets cluster `status: Published` when a merged answer is imported.
- Success notice shows counts; students see answers on **Track my answer** by ticket.

### 3.3 Word brief & submission register

- **Word brief** — printable one-page-per-cluster summary for mentors without Excel.
- **Full submission register** — audit export of every submission with cluster assignment.

---

## 4. Individual answers — Insights briefing board only

**Location:** Staff tab → **Insights** → Briefing board → **Provide answer**

- For students who opted **No** at the Ask Desk (never merged).
- Also works for merge-opted students who need a **personal note** in addition to the hall answer.
- Saves via `answerIndividual` API → `individualAnswer` on the submission record in Firestore.
- For merge-opted students the **hall** lane still comes from the cluster / `MERGED_ANSWER` import in the mentor pack.
- Track applies the dual-answer rules in section 5.

There is **no** separate `INDIVIDUAL_BRIEF` download/upload in the mentor pack.

---

## 5. What students see (Track my answer)

| Student type | Merged answer | Individual answer | UX |
|--------------|---------------|-------------------|-----|
| Opted **Yes** to merge | ✓ | ✓ | Both blocks, clearly labelled |
| Opted **Yes** | ✓ | — | Hall answer + “Personal note coming soon” |
| Opted **Yes** | — | ✓ | Personal answer + “Hall answer coming soon” |
| Opted **Yes** | — | — | “Grouped with N others…” status |
| Opted **No** | — | ✓ | Mentor answer only (no merge messaging) |
| Opted **No** | — | — | “Received — with the desk” |

---

## 6. What works today vs known gaps

### Works today

- Firestore-backed store (`/api/aym-store`) for questions, clusters, individual answers.
- Consent-gated merge pool.
- Theme + subtheme grouping (default).
- Two-pass weighted similarity clustering with packing toward ~6–7 members.
- Manual merge / split.
- Per-member Excel export with merged answer columns.
- Merged answer upload in mentor pack (same section as download).
- Track dual-answer UX for merge-opted students.
- Insights individual answer → Track (sole path for opt-out students).
- Public Answer board for published cluster answers.

### Gaps / limitations

- **Similarity is lexical only** — paraphrases with different words may not merge (see future enhancements).
- **No merge audit log** — who merged/split and when is not recorded.
- **No async job queue** — re-merge on 500+ questions runs in the browser; may feel slow.
- **Email lookup on Track** requires delegate session or staff; ticket lookup is public.
- **Board vs Track** — Answer board shows published **cluster** answers only, not personal notes.
- **Variant cap** — UI stores up to 3 variant wordings per cluster (Excel export lists every member).

---

## 7. Future enhancements (recommendations)

| Priority | Enhancement | Why |
|----------|-------------|-----|
| High | **Embedding similarity** (e.g. small multilingual model) | Catch paraphrased questions Jaccard misses. |
| High | **Server-side merge job** | Scale beyond browser timeout; retry + progress bar. |
| Medium | **Audit log** | `merged_by`, `split_at`, import batch id for accountability. |
| Medium | **Confidence score** | Show staff “87% similar” before auto-merge. |
| Medium | **Queue dashboard** | Unclustered / uncomposed / awaiting mentor counts by theme. |
| Low | **Student notification** | Email/SMS when answer lands on Track. |
| Low | **Versioned answers** | Edit history if mentor revises guidance. |

---

## 8. Quick staff checklist

1. **Merge questions** on Curation desk (tune threshold if groups look wrong; default 0.42).
2. **Write composite** wording for each group.
3. **Export Excel** from Mentor pack (filter by theme if needed).
4. Mentors fill **MERGED_ANSWER** (+ optional **INDIVIDUAL_ANSWER** per row for personal notes).
5. **Upload filled merged sheet** in mentor pack → verify counts in success notice.
6. Spot-check on **Track my answer** with a sample ticket.
7. Use **Insights → Provide answer** for opt-out students and one-off personal replies.
8. **Publish** on Curation desk if answers should appear on the public Answer board (import auto-publishes).

---

*Last updated: August 2026 — ayurmarg-preview*
