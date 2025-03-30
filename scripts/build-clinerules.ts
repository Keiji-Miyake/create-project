import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

// ルールファイルが格納されているディレクトリ
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RULES_DIR = path.join(__dirname, '../.cline/rules');
// 出力ファイルパス
const OUTPUT_FILE = path.join(__dirname, '../.clinerules');

// ルールファイルを数字順に読み込む
function buildClinerules() {
  try {
    // .cline/rules ディレクトリからファイル一覧を取得
    const files = fs.readdirSync(RULES_DIR)
      .filter(file => file.endsWith('.md'))
      .sort(); // 00_, 10_... の順でソート

    let content = '';
    
    // 各ファイルの内容を結合
    for (const file of files) {
      const filePath = path.join(RULES_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // ファイル間に区切りを追加
      content += `\n\n<!-- ${file} -->\n\n${fileContent}\n`;
    }

    // .clinerules に書き出し
    fs.writeFileSync(OUTPUT_FILE, content.trim());
    console.log(`Successfully built .clinerules from ${files.length} rule files`);
  } catch (error) {
    console.error('Error building .clinerules:', error);
    process.exit(1);
  }
}

buildClinerules();