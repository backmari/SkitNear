package group1.toa.repository;

import group1.toa.domain.Toilet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@Component
public class ToaRepository {

    @Autowired
    private DataSource dataSource;

    public List<Toilet> getToilets() {

        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM [Academy_Projekt1].[dbo].[PublicToilets]")) {
            List<Toilet> allToilets = new ArrayList<>();

            while (rs.next()) {
                allToilets.add(rsToilet(rs));
            }
            return allToilets;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;

    }

    private Toilet rsToilet(ResultSet rs) throws SQLException {

        return new Toilet(rs.getString("Index"),
                rs.getString("Address"),
                rs.getFloat("Latitude"),
                rs.getFloat("Longitude"),
                rs.getInt("IsHandicap"),
                rs.getInt("HasChangingTable"),
                rs.getInt("MustPay"),
                rs.getString("Hours"));
    }

}
