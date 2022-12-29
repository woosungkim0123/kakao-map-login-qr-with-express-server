/*
export default class AdminSurveyRepository {
  static async getLimitUserServeyResult({ m_no, cPage, limit }) {
    let value = [m_no, cPage, limit];
    let QUERY = `
    SELECT u_sur_no, u_name, 
    (SELECT users_cate_name FROM users_category WHERE users_cate_code = u_position) AS u_position, 
    match_u_grade, match_u_major, match_u_etc,
    CONCAT(SUBSTRING(u_phone FROM 1 FOR 3),'-', SUBSTRING(u_phone FROM 4 FOR 4), '-',SUBSTRING(u_phone FROM 8 FOR 4)) AS u_phone,
    DATE_FORMAT(u_sur_create_date, '%Y-%m-%d %H:%i:%s') AS u_sur_create_date,
    (SELECT team_name FROM team WHERE team_no = match_team) AS team_name
    FROM ${Table.USER_SURVEY} LEFT JOIN ${Table.USERS} ON u_sur_u_no = u_no LEFT JOIN ${Table.MATCHING} on u_no=match_u_no 
    WHERE u_m_no=? ORDER BY u_sur_create_date LIMIT ?, ?`;
    return db.execute(QUERY, value).then((result) => result[0]);
  }
  static async getCountUserServeyResult({ m_no }) {
    let value = [m_no];
    let QUERY = `
    SELECT COUNT(*) as cnt FROM ${Table.USER_SURVEY} LEFT JOIN ${Table.USERS} ON u_sur_u_no = u_no WHERE u_m_no=?`;
    return db.execute(QUERY, value).then((result) => result[0][0].cnt);
  }
  static async oneSurveyResultVeiw({ u_sur_no }) {
    let value = [u_sur_no];
    const QUERY = `SELECT u_sur_content FROM user_survey WHERE u_sur_no = ?`;
    return db.execute(QUERY, value).then((result) => result[0][0]);
  }
  static async getSurveyData(m_no) {
    const QUERY = `SELECT b.u_name, a.*  FROM u_survey_total a LEFT JOIN users b ON a.u_s_no = b.u_no WHERE b.u_m_no = ?`;
    return db.execute(QUERY, [m_no]).then((result) => result[0]);
  }
  static async getNotTotalMember(m_no) {
    const QUERY = `SELECT u_sur_u_no, u_sur_content FROM user_survey LEFT JOIN users ON u_no=u_sur_u_no LEFT JOIN u_survey_total ON u_s_no=u_no WHERE u_m_no =? AND ust_no IS NULL`;
    return db.execute(QUERY, [m_no]).then((result) => result[0]);
  }
  static async insertTotalSurveyData({ u_no, surveyArray }) {
    let QUERY = 'INSERT INTO u_survey_total (u_s_no';
    QUERY += this._addSurveyQuery(surveyArray);
    QUERY += `) VALUES (?`;
    QUERY += this._addQuestionQuery(surveyArray);
    QUERY += `)`;
    return db.execute(QUERY, [u_no, ...surveyArray]);
  }

  static _addSurveyQuery(array) {
    let QUERY = '';
    for (let i = 0; i < array.length; i++) QUERY += `, s_${i}`;
    return QUERY;
  }

  static _addQuestionQuery(array) {
    let QUERY = '';
    for (let i = 0; i < array.length; i++) QUERY += `, ?`;
    return QUERY;
  }
}

*/
